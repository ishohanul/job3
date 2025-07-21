import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
        success: false,
      });
    }

    req.id = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
}; 