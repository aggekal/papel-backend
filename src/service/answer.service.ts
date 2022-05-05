import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import AnswerModel, {
  AnswerDocument,
  AnswerInput,
} from "../models/answer.model";

export async function createAnswer(input: AnswerInput) {
  return AnswerModel.create(input);
}
export async function findAnswer(
  query: FilterQuery<AnswerDocument>,
  options: QueryOptions = { lean: true }
) {
  return AnswerModel.findOne(query, {}, options);
}
export async function findAndUpdateAnswer(
  query: FilterQuery<AnswerDocument>,
  update: UpdateQuery<AnswerDocument>,
  options: QueryOptions
) {
  return AnswerModel.findOneAndUpdate(query, update, options);
}
export async function deleteAnswer(query: FilterQuery<AnswerDocument>) {
  return AnswerModel.deleteOne(query);
}

export async function findAnswersByUserExam(
  query: FilterQuery<AnswerDocument>,
  options: QueryOptions = { lean: true }
) {
  return AnswerModel.find(
    { issuedById: query.issuedById, examId: query.examId },
    {},
    options
  );
}
