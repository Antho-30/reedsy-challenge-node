import { Request, Response } from "express";
import { createJob, getJobsByType } from "../services/job.service";

export const createJobController = async (req: Request, res: Response) => {
  const { bookId, type } = req.body;
  if (!bookId || !["epub", "pdf"].includes(type)) {
    return res.status(400).json({ error: "Invalid bookId or type" });
  }
  try {
    const job = await createJob(bookId, type);
    return res.status(201).json(job);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const createImportJobController = async (req: Request, res: Response) => {
    const { bookId, type, url } = req.body;
    if (!bookId || !url || !["word", "pdf", "wattpad", "evernote"].includes(type)) {
      return res.status(400).json({ error: "Invalid bookId, type, or URL" });
    }
    try {
      const job = await createJob(bookId, type);
      return res.status(201).json(job);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
  
  export const getExportJobsController = async (req: Request, res: Response) => {
    try {
      const jobs = await getJobsByType();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
  
  export const getImportJobsController = async (req: Request, res: Response) => {
    try {
      const jobs = await getJobsByType();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
