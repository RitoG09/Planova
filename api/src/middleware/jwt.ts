import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const rawAuth = req.headers.authorization;
    const cookieToken = req.cookies.accessToken;
    console.log("🔹 Raw Authorization:", rawAuth);
    console.log("🔹 Cookie Token:", cookieToken);

    const token = cookieToken || rawAuth?.split(" ")[1];
    if (!token) {
      console.log("No token found");
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
    console.log("Decoded JWT:", decoded);

    const user = await User.findById(decoded.id).select("password");
    if (!user) {
      console.log("User not found for decoded id:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Token is invalid" });
  }
};
