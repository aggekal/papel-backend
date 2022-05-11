import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import QuestionModel, {
  ExamQuestionDocument,
  QuestionCategory,
  QuestionDocument,
  QuestionInput,
  QuestionsLesson,
} from "../models/question.model";

export async function createQuestion(input: QuestionInput) {
  return QuestionModel.create(input);
}
export async function findQuestion(
  query: FilterQuery<QuestionDocument>,
  options: QueryOptions = { lean: false }
) {
  return QuestionModel.findOne({ _id: query.questionId }, {}, options);
}
export async function findAndUpdateQuestion(
  query: FilterQuery<QuestionDocument>,
  update: UpdateQuery<QuestionDocument>,
  options: QueryOptions
) {
  return QuestionModel.findOneAndUpdate(
    { _id: query.questionId },
    update,
    options
  );
}
export async function deleteQuestion(query: FilterQuery<QuestionDocument>) {
  return QuestionModel.deleteOne({ _id: query.questionId });
}

export async function findQuestions(
  query: FilterQuery<ExamQuestionDocument>,
  options: QueryOptions = { lean: true }
) {
  return QuestionModel.find({ _id: { $in: query.questions } }, {}, options);
}

export async function getQuestionByCategory(
  query: FilterQuery<QuestionCategory>,
  options: QueryOptions = { lean: true }
) {
  return QuestionModel.find(
    { category: query.category, lessonId: query.lessonId },
    {},
    options
  );
}

export async function getQuestionByDifficulty(
  query: FilterQuery<QuestionCategory>,
  options: QueryOptions = { lean: true }
) {
  console.log(query);
  return QuestionModel.find(
    { difficulty: query.difficulty, lessonId: query.lessonId },
    {},
    options
  );
}

export async function getQuestionsByLesson(
  query: FilterQuery<QuestionsLesson>,
  options: QueryOptions = { lean: false }
) {
  return QuestionModel.find({ lessonId: query.lessonId }, {}, options);
}
