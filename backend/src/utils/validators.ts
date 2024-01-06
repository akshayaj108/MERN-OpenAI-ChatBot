import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";
export const loginUser = [
  body("email").trim().isEmail().withMessage("Enter valid Email ID"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter password greater than 5 character"),
];
export const validateNewUser = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginUser,
];

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const errRes = await validation.run(req);
      if (!errRes.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors });
  };
};
