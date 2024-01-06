import { Router } from "express";
import {
  getUsers,
  signInUsers,
  signUpUsers,
} from "../controllers/user-controller.js";
import { loginUser, validate, validateNewUser } from "../utils/validators.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", validate(validateNewUser), signUpUsers);
userRouter.post("/signin", validate(loginUser), signInUsers);
export default userRouter;
