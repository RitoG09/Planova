"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.signin = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createError_1 = __importDefault(require("../utils/createError"));
const signup = async (req, res, next) => {
    try {
        const hash = bcryptjs_1.default.hashSync(req.body.password, 5);
        const newUser = new user_model_1.default({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(201).send("user has been created");
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
const signin = async (req, res, next) => {
    try {
        const user = await user_model_1.default.findOne({ email: req.body.email });
        if (!user)
            return next((0, createError_1.default)(404, "user not found!"));
        const isCorrect = bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!isCorrect)
            return next((0, createError_1.default)(400, "Wrong password or email!"));
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
        }, process.env.JWT_KEY);
        const { password, ...info } = user._doc;
        res
            .cookie("accessToken", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ token, user: info });
    }
    catch (error) {
        next(error);
    }
};
exports.signin = signin;
const signout = async (req, res) => {
    res
        .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .send("User has been logged out!");
};
exports.signout = signout;
