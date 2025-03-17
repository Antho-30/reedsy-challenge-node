import request from "supertest";
import app from "../src/server";

describe("Jobs API", () => {
  describe("POST /jobs/export", () => {
    it("should create an export job when data is valid", async () => {
      const response = await request(app)
        .post("/jobs/export")
        .send({ bookId: "12345", type: "epub" });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
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
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
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
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("pending");
      expect(response.body).toHaveProperty("finished");
    });
  });
});