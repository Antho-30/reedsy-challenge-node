import { Schema, model, Document } from "mongoose";

export interface IJob extends Document {
  bookId: string;
  type: "epub" | "pdf" | "word" | "wattpad" | "evernote";
  status: "pending" | "finished";
  created_at: Date;
  updated_at: Date;
}

const JobSchema = new Schema<IJob>({
  bookId: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["epub", "pdf", "word", "wattpad", "evernote"], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "finished"], 
    default: "pending" 
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// this hook is there to update the updated_at field every time the document is saved
// this is useful to track when the job was last updated
JobSchema.pre<IJob>("save", function (next) {
  this.updated_at = new Date();
  next();
});

export default model<IJob>("Job", JobSchema);
