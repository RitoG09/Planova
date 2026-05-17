import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";
import { NextFunction, Request, Response } from "express";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    res.status(201).send("user has been created");
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "user not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong password or email!"));

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY as string,
    );

    const { password, ...info } = (user as any)._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token, user: info });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req: any, res: any) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out!");
};
