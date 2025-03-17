import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();

let mongoServer: MongoMemoryServer | null = null;

/**
 * Connects to MongoDB.
 * - In test environment, it uses an in-memory MongoDB instance.
 * - Otherwise, it uses the URI provided in the environment variable MONGO_URI.
 */
export const connectDB = async (): Promise<void> => {
  try {
    let mongoURI: string;
    if (process.env.NODE_ENV === "test") {
      // Use in-memory MongoDB for testing
      mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
    } else {
      mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/reedsy";
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

/**
 * Closes the MongoDB connection and stops the in-memory server if it exists.
 */
export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};
