import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import { 
  applyJob, 
  getApplicants, 
  getAppliedJobs, 
  updateStatus,
  getAdminApplications,
  updateAdminApplicationStatus,
  deleteAdminApplication
} from "../controllers/application.controller.js";

const router = express.Router();

// Admin routes (must come before other routes to avoid conflicts)
router.route("/admin/applications").get(getAdminApplications);
router.route("/admin/status/:id").patch(updateAdminApplicationStatus);
router.route("/admin/:id").delete(deleteAdminApplication);

router.route("/apply/:id").get(authenticateToken, applyJob);
router.route("/get").get(authenticateToken, getAppliedJobs);
router.route("/:id/applicants").get(authenticateToken, getApplicants);
router.route("/status/:id/update").post(authenticateToken, updateStatus);

export default router;
