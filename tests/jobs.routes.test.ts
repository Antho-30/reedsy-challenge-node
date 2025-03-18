import request from "supertest";
import app from "../src/server";
import { closeDB, connectDB } from "../src/config/database";

jest.setTimeout(30000); // we set a timeout of 30s to match the dummy processing time job

describe("Jobs API", () => {

    // Connect to the database before running tests
  beforeAll(async () => {
    await connectDB();
  });

  describe("Jobs API", () => {
    describe("POST /jobs/export", () => {
      it("should create an export job when data is valid", async () => {
        const response = await request(app)
          .post("/jobs/export")
          .send({ bookId: "12345", type: "epub" });
        // Expected: HTTP 201 and a response with _id, bookId, type and status "pending"
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.bookId).toBe("12345");
        expect(response.body.type).toBe("epub");
        expect(response.body.status).toBe("pending");
      });
  
      it("should return 400 if the export type is invalid", async () => {
        const response = await request(app)
          .post("/jobs/export")
          .send({ bookId: "12345", type: "invalid" });
        expect(response.status).toBe(400);
      });
    });
  
    describe("POST /jobs/import", () => {
      it("should create an import job when data is valid", async () => {
        const response = await request(app)
          .post("/jobs/import")
          .send({ bookId: "67890", type: "word", url: "https://example.com/doc.docx" });
        // Expected: HTTP 201 with a valid job object containing _id, bookId, type and status "pending"
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.bookId).toBe("67890");
        expect(response.body.type).toBe("word");
        expect(response.body.status).toBe("pending");
      });
  
      it("should return 400 if required data is missing", async () => {
        const response = await request(app)
          .post("/jobs/import")
          .send({ bookId: "67890", type: "word" }); // URL is missing
        expect(response.status).toBe(400);
      });
    });
  
    describe("GET /jobs/export", () => {
      it("should list export jobs grouped by status", async () => {
      // Create an export job to ensure there is data
        await request(app)
          .post("/jobs/export")
          .send({ bookId: "12345", type: "pdf" });
        const response = await request(app).get("/jobs/export");
        // Expected: HTTP 200 with an object containing keys "pending" and "finished"
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("pending");
        expect(response.body).toHaveProperty("finished");
      });
    });
  
    describe("GET /jobs/import", () => {
      it("should list import jobs grouped by status", async () => {
      // Create an import job to ensure there is data
        await request(app)
          .post("/jobs/import")
          .send({ bookId: "67890", type: "pdf", url: "https://example.com/doc.pdf" });
        const response = await request(app).get("/jobs/import");
        // Expected: HTTP 200 with an object containing keys "pending" and "finished"
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("pending");
        expect(response.body).toHaveProperty("finished");
      });
    });
  });

  afterAll(async () => {
    await closeDB();
  });
  
});