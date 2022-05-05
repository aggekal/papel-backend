import mongoose from "mongoose";
import { SCORES } from "../../types";

export interface AnswerInput {
  lessonId: string;
  questionId: string;
  issuedById: string;
  examId: string;
  content: string;
  score: string;
}

export interface AnswerDocument extends AnswerInput, mongoose.Document {
  submitedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const answerSchema = new mongoose.Schema(
  {
    lessonId: { type: String, required: true },
    questionId: { type: String, required: true },
    issuedById: { type: String, required: true },
    examId: { type: String, required: true },
    content: { type: String, required: true },
    score: { type: String, required: true, default: SCORES.NOSCORE },
    submitedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const AnswerModel = mongoose.model<AnswerDocument>("Answer", answerSchema);

export default AnswerModel;
