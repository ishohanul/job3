import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUserByAdmin,
  deleteUserByAdmin,
  getAdminStats,
  createUserByAdmin,
  downloadResume,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);

// Authenticated resume download
router.route("/resume/:userId").get(authenticateToken, downloadResume);

// Admin routes
router.route("/admin/users").get(isAdmin, getAllUsers);
router.route("/admin/users").post(isAdmin, createUserByAdmin);
router.route("/admin/users/:userId").get(isAdmin, getUserById);
router.route("/admin/users/:userId").put(isAdmin, updateUserByAdmin);
router.route("/admin/users/:userId").delete(isAdmin, deleteUserByAdmin);
router.route("/admin/stats").get(isAdmin, getAdminStats);

export default router;
