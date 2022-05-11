import { z, object, string, TypeOf, date, number } from "zod";
import { EXAM_STATUS } from "../../types";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

const payload = {
  body: object({
    lessonId: string({
      required_error: "lesson id is required",
    }),
    startDate: dateSchema,
    questions: string({
      required_error: "questions required",
    }).array(),
    status: string().default(EXAM_STATUS.NOT_STARTED),
    maxScore: number().default(10),
  }),
};

const params = {
  params: object({
    _id: string({
      required_error: "exam id is required",
    }),
  }),
};

const userExamParams = {
  params: object({
    userId: string({
      required_error: "user id is required",
    }),
    examId: string({
      required_error: "user id is required",
    }),
  }),
};

export const createExamSchema = object({
  ...payload,
});

export const updateExamSchema = object({
  ...payload,
  ...params,
});
export const deleteExamSchema = object({
  ...params,
});
export const getExamSchema = object({
  ...params,
});
export const getExamQuestionsSchema = object({
  ...params,
});

export const getUserExamQuestionsAndAnswersSchema = object({
  ...userExamParams,
});

export type createExamInput = TypeOf<typeof createExamSchema>;
export type updateExamInput = TypeOf<typeof updateExamSchema>;
export type readExamInput = TypeOf<typeof getExamSchema>;
export type deleteExamInput = TypeOf<typeof deleteExamSchema>;
export type getExamQuestionsInput = TypeOf<typeof getExamQuestionsSchema>;
export type getUserExamQuestionsAndAnswersInput = TypeOf<
  typeof getUserExamQuestionsAndAnswersSchema
>;
