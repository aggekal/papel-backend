import mongoose from "mongoose";

export interface LessonInput {
  name: string;
  category: string;
}

export interface LessonDocument extends LessonInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LessonModel = mongoose.model<LessonDocument>("Lesson", lessonSchema);

export default LessonModel;
