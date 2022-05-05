import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import LessonModel, {
  LessonDocument,
  LessonInput,
} from "../models/lesson.model";

export async function createLesson(input: LessonInput) {
  return LessonModel.create(input);
}
export async function findLesson(
  query: FilterQuery<LessonDocument>,
  options: QueryOptions = { lean: true }
) {
  return LessonModel.findOne(query, {}, options);
}
export async function findAndUpdateLesson(
  query: FilterQuery<LessonDocument>,
  update: UpdateQuery<LessonDocument>,
  options: QueryOptions
) {
  return LessonModel.findOneAndUpdate(query, update, options);
}
export async function deleteLesson(query: FilterQuery<LessonDocument>) {
  return LessonModel.deleteOne(query);
}

export async function findLessons(options: QueryOptions = { lean: true }) {
  return LessonModel.find({}, {}, options);
}
