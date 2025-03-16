import { v4 as uuidv4 } from "uuid";

// We're defining the Job interface
// This is a TypeScript feature that allows us to define the shape of an object
export interface Job {
  id: string;
  bookId: string;
  type: "epub" | "pdf" | "word" | "wattpad" | "evernote";
  status: "pending" | "finished";
  created_at: Date;
  updated_at: Date;
}

// This is a simple in-memory storage
const jobs: Job[] = [];

/**
 * Ceation job with status 'pending'
 * in-memory storage
 */
export const createJob = (bookId: string, type: string): Job => {
  // Create a minimal job object
  const job: Job = {
    id: uuidv4(),
    bookId,
    type: type as Job["type"],
    status: "pending",
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Push the job to the in-memory storage
  jobs.push(job);

  return job;
};

/**
 * Return jobs grouped by status
 */
export const getJobsByType = () => {
  return {
    pending: jobs.filter((job) => job.status === "pending"),
    finished: jobs.filter((job) => job.status === "finished"),
  };
};