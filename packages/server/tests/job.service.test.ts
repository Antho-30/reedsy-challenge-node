import { createJob, getJobsByType } from "../src/services/job.service";
import { connectDB, closeDB } from "../src/config/database";

jest.setTimeout(30000); // we set a timeout of 30s to match the dummy processing time job

describe("Job Service with MongoDB", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  it("should create a job with status 'pending'", async () => {
    const job = await createJob("12345", "epub");
    expect(job).toHaveProperty("_id");
    expect(job.bookId).toBe("12345");
    expect(job.type).toBe("epub");
    expect(job.status).toBe("pending");
  });

  it("should list jobs grouped by status", async () => {
    await createJob("67890", "pdf");
    const jobs = await getJobsByType();
    expect(jobs).toHaveProperty("pending");
    expect(jobs).toHaveProperty("finished");
  });
});
