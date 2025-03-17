import { createJob, getJobsByType } from "../src/services/job.service";
describe("Job Service", () => {
    it("should create a job with status 'pending'", () => {
        const job = createJob("12345", "epub");

        expect(job).toHaveProperty("id");
        expect(job.bookId).toBe("12345");
        expect(job.type).toBe("epub");
        expect(job.status).toBe("pending");
    });

    it("should list jobs grouped by status", () => {
        createJob("67890", "pdf"); // We create a job to group them by status
        const jobs = getJobsByType();

        expect(jobs).toHaveProperty("pending");
        expect(jobs).toHaveProperty("finished");
    });
});