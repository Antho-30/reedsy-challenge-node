import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jobsRoutes from "./routes/jobs.routes";
import { connectDB } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Only connect to DB if not in test mode (tests will handle DB connection)
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

app.use("/jobs", jobsRoutes);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
