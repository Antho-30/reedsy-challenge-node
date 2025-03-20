import JobModel, { IJob } from "../models/Job";

/**
 * Creates a new job in the database with status "pending".
 * Simulates job processing by updating the status after a delay.
 */
export const createJob = async (bookId: string, type: string): Promise<IJob> => {
  const newJob = new JobModel({
    bookId,
    type,
    status: "pending",
    created_at: new Date(),
    updated_at: new Date(),
  });

  const savedJob = await newJob.save();

  // Determine processing time based on job type
  const processingTime =
    type === "epub" ? 10000 : type === "pdf" ? 25000 : 60000;

  // Simulate asynchronous processing that will mark the job as "finished"
  const timer = setTimeout(async () => {
    savedJob.status = "finished";
    savedJob.updated_at = new Date();
    await savedJob.save();
  }, processingTime);

  // Ensure the timer from the dummy processing time does not block process exit
  timer.unref();

  // Convert the saved Mongoose document to a plain JavaScript object
  const plainJob = savedJob.toObject();
  return plainJob;
};

/**
 * Retrieves jobs from the database grouped by their status,
 * returning plain JavaScript objects.
 */
export const getJobsByType = async (): Promise<any> => {
  const pendingJobs = await JobModel.find({ status: "pending" }).lean();
  const finishedJobs = await JobModel.find({ status: "finished" }).lean();

  return {
    pending: pendingJobs,
    finished: finishedJobs,
  };
};
