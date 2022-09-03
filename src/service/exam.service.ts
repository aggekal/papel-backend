import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ExamModel, { ExamDocument, ExamInput } from "../models/exam.model";

export async function createExam(input: ExamInput) {
  return ExamModel.create(input);
}
export async function findExam(
  query: FilterQuery<ExamDocument>,
  options: QueryOptions = { lean: true }
) {
  return ExamModel.findOne(query, {}, options);
}
export async function findExams(
  query: FilterQuery<ExamDocument>,
  options: QueryOptions = { lean: true }
) {
  return ExamModel.find(query, {}, options);
}
export async function findAndUpdateExam(
  query: FilterQuery<ExamDocument>,
  update: UpdateQuery<ExamDocument>,
  options: QueryOptions
) {
  return ExamModel.findOneAndUpdate(query, update, options);
}
export async function deleteExam(query: FilterQuery<ExamDocument>) {
  return ExamModel.deleteOne(query);
}
