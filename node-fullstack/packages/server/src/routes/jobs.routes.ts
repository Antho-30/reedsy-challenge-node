import { Router } from "express";
import {
  createJobController,
  createImportJobController,
  getExportJobsController,
  getImportJobsController,
} from "../controllers/jobs.controller";

const router = Router();

// POST /jobs/export
router.post("/export", createJobController);

// POST /jobs/import
router.post("/import", createImportJobController);

// GET /jobs/export
router.get("/export", getExportJobsController);

// GET /jobs/import
router.get("/import", getImportJobsController);

export default router;