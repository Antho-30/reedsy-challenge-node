import { Request, Response } from "express";
import { createJob } from "../services/job.service";

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
