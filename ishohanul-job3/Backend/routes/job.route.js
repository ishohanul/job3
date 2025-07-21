import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJobStatus,
} from "../controllers/job.controller.js";

const router = express.Router();

// Admin routes (must come before parameterized routes)
router.route("/admin/jobs").get(getAdminJobs);

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get(authenticateToken, getAllJobs);
router.route("/get/:id").get(authenticateToken, getJobById);
router.route("/:id/status").patch(updateJobStatus);
export default router;
