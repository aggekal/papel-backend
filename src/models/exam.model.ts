import mongoose from "mongoose";
import { EXAM_STATUS } from "../../types";

export interface ExamInput {
  lessonId: string;
  startDate: Date;
  questions: string[];
  status: string;
  maxScore: number;
}

export interface ExamDocument extends ExamInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const examSchema = new mongoose.Schema(
  {
    lessonId: { type: String, required: true },
    startDate: { type: Date, required: true },
    questions: { type: [String], required: true },
    status: { type: String, required: true, default: EXAM_STATUS.NOT_STARTED },
    maxScore: { type: Number, required: true, default: 10 },
  },
  {
    timestamps: true,
  }
);

const ExamModel = mongoose.model<ExamDocument>("Exam", examSchema);

export default ExamModel;
