import { Router, Request, Response } from "express";
import { createJob, getJobsByType } from "../services/job.service";

const router = Router();

// POST /jobs/export
router.post("/export", async (req: Request, res: Response) => {
  const { bookId, type } = req.body;
  if (!bookId || !["epub", "pdf"].includes(type)) {
    return res.status(400).json({ error: "Invalid bookId or type" });
  }
  try {
    const job = await createJob(bookId, type);
    // Convert the Mongoose document into a plain object
    return res.status(201).json(job.toObject());
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /jobs/import
router.post("/import", async (req: Request, res: Response) => {
  const { bookId, type, url } = req.body;
  if (!bookId || !url || !["word", "pdf", "wattpad", "evernote"].includes(type)) {
    return res.status(400).json({ error: "Invalid bookId, type, or URL" });
  }
  try {
    const job = await createJob(bookId, type);
    return res.status(201).json(job.toObject());
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /jobs/export
router.get("/export", async (req: Request, res: Response) => {
  try {
    const jobs = await getJobsByType();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /jobs/import
router.get("/import", async (req: Request, res: Response) => {
  try {
    const jobs = await getJobsByType();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

console.log("Jobs routes loaded");

export default router;
