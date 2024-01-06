import { NextFunction, Request, Response } from "express";
import users from "../models/users.js";
import { compareSync, hash, hashSync } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await users.find().select("-password");
    res.status(200).json({ message: "Fetched Successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error", cause: err.message });
  }
};

export const signUpUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msessage: "All fields are required" });
  try {
    let user = await users.findOne({ email });
    if (user) return res.status(409).json({ message: "User is already exist" });
    password = hashSync(password, 10);
    const newUser = new users({ name, email, password });
    await newUser.save();
    newUser.password = null;
    //clearing previous cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      signed: true,
    });
    // create token
    const token = await createToken(user._id.toString(), user.email, "7d");
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);
    res.header("auth-token", token).cookie(COOKIE_NAME, token, {
      httpOnly: true,
      expires: expire,
      path: "/",
      domain: "localhost",
      signed: true,
    });
    // const token =await newUser.generateAuthToken();
    //res.cookie("token",token,{httpOnly : true}).send(newUser)
    res.status(201).json({
      message: "Sign Up Successful",
      response: newUser,
      userID: newUser._id.toString(),
    });
  } catch (error) {
    console.log("error in SignUp==", error);
    return next(error);
  }
};
export const signInUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, password } = req.body;

  try {
    let user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isCorrect = compareSync(password, user.password);
    if (!isCorrect) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    user.password = null;
    //clearing previous cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      signed: true,
    });

    const token = await createToken(user._id.toString(), user.email, "7d");
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);
    res.header("auth-token", token).cookie(COOKIE_NAME, token, {
      httpOnly: true,
      expires: expire,
      path: "/",
      domain: "localhost",
      signed: true,
    });

    // const token =await newUser.generateAuthToken();
    //res.cookie("token",token,{httpOnly : true}).send(newUser)
    return res.status(200).json({
      message: "SignIn Successful",
      response: user,
      userID: user._id.toString(),
    });
  } catch (error) {
    console.log("error in SignUp==", error);
    return next(error);
  }
};
