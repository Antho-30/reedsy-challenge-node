import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jobsRoutes from "./routes/jobs.routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes under "/jobs"
app.use("/jobs", jobsRoutes);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;