import { Router, Request, Response } from "express";
import { createJob, getJobsByType } from "../services/job.service";

console.log("Jobs routes loaded");
const router = Router();
// POST /jobs/export
router.post("/export", (req, res) => {
    const { bookId, type } = req.body;
    if (!bookId || !["epub", "pdf"].includes(type)) {
        return res.status(400).json({ error: "Invalid bookId or type" });
    } 
    const job = createJob(bookId, type);
    res.status(201).json(job);
});

// POST /jobs/import
router.post("/import", (req, res) => {
  const { bookId, type, url } = req.body;
  if (!bookId || !url || !["word", "pdf", "wattpad", "evernote"].includes(type)) {
    return res.status(400).json({ error: "Invalid bookId, type, or URL" });
  }
  const job = createJob(bookId, type);
  res.status(201).json(job);
});

// GET /jobs/export
router.get("/export", (req, res) => {
  res.json(getJobsByType());
});

// GET /jobs/import
router.get("/import", (req, res) => {
  res.json(getJobsByType());
});

export default router;