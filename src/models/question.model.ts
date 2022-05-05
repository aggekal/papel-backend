import mongoose from "mongoose";

export interface QuestionInput extends mongoose.Document {
  lessonId: string;
  category: string;
  description: string;
  correctAnswers: string[];
  time: string;
  difficulty: string;
  penalty: boolean;
  chapter: string;
  score: string;
  availableAnswers: string[];
}

export interface QuestionDocument extends QuestionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamQuestionDocument extends mongoose.Document {
  questions: string[];
}

export interface QuestionCategory extends mongoose.Document {
  category: string;
}

export interface QuestionsLesson extends mongoose.Document {
  _id: string;
}

const questionSchema = new mongoose.Schema(
  {
    lessonId: { type: String },
    category: { type: String },
    description: { type: String },
    time: { type: String },
    difficulty: { type: String },
    penalty: { type: Boolean },
    chapter: { type: String },
    score: { type: String },
    correctAnswers: { type: [String] },
    availableAnswers: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const QuestionModel = mongoose.model<QuestionDocument>(
  "Question",
  questionSchema
);
export default QuestionModel;
