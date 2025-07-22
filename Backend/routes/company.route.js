import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAllCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
  updateCompanyStatus,
  deleteCompany,
  getAdminCompanies,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// Admin routes (must come before parameterized routes)
router.route("/admin/companies").get(getAdminCompanies);

router.route("/register").post(registerCompany);
router.route("/get").get(getAllCompanies);
router.route("/get/:id").get(authenticateToken, getCompanyById);
router.route("/update/:id").put(authenticateToken, singleUpload, updateCompany);
router.route("/:id/status").patch(updateCompanyStatus);
router.route("/:id").delete(deleteCompany);

export default router;
