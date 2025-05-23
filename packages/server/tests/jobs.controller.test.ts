import { Request, Response } from "express";
import { createJobController, getExportJobsController, getImportJobsController } from "../src/controllers/jobs.controller";
import * as jobService from "../src/services/job.service";

describe("Jobs Controller - createJobController", () => {
  it("should return 400 if bookId or type is invalid", async () => {
    // We're mocking the Request and Response objects
    const req = {
      body: { bookId: "12345", type: "invalid" }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any as Response;

    await createJobController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid bookId or type" });
  });

  it("should create an export job when data is valid", async () => {
    // Simulate a request with a valid bookId and type
    const req = {
      body: { bookId: "12345", type: "epub" }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any as Response;

    // Mock the createJob method to return a simulate job
    jest.spyOn(jobService, "createJob").mockResolvedValueOnce({
      _id: "mockedId",
      bookId: "12345",
      type: "epub",
      status: "pending",
      created_at: new Date(),
      updated_at: new Date()
    } as any);

    await createJobController(req, res);

    expect(jobService.createJob).toHaveBeenCalledWith("12345", "epub");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: "mockedId",
        bookId: "12345",
        type: "epub",
        status: "pending"
      })
    );
  });
});

describe("Jobs Controller - getExportJobsController", () => {
  it("should return 200 with pending and finished arrays", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;

    // Mock the getJobsByType method to return a pending & and finished objects
    jest.spyOn(jobService, "getJobsByType").mockResolvedValueOnce({
      pending: [{ _id: "job1", type: "pdf" }],
      finished: [{ _id: "job2", type: "epub" }],
    });

    await getExportJobsController(req, res);

    expect(jobService.getJobsByType).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      pending: [{ _id: "job1", type: "pdf" }],
      finished: [{ _id: "job2", type: "epub" }],
    });
  });
});

describe("Jobs Controller - getImportJobsController", () => {
  it("should return 200 with pending and finished arrays", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;

    jest.spyOn(jobService, "getJobsByType").mockResolvedValueOnce({
      pending: [{ _id: "import1", type: "word" }],
      finished: [{ _id: "import2", type: "pdf" }],
    });

    await getImportJobsController(req, res);

    expect(jobService.getJobsByType).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      pending: [{ _id: "import1", type: "word" }],
      finished: [{ _id: "import2", type: "pdf" }],
    });
  });
});
