import { date, object, string, TypeOf } from "zod";
import { SCORES } from "../../types";
const payload = {
  body: object({
    lessonId: string({
      required_error: "lessonId is required",
    }),
    questionId: string({
      required_error: "questionId is required",
    }),
    examId: string({
      required_error: "examId is required",
    }),
    issuedById: string({
      required_error: "issuedById is required",
    }),
    content: string({
      required_error: "content is required",
    }),
    score: string({
      required_error: "score is required",
    }).default(SCORES.NOSCORE),
    submitedAt: date().optional(),
  }),
};

const params = {
  params: object({
    _id: string({
      required_error: "question id is required",
    }),
  }),
};

export const createAnswerSchema = object({
  ...payload,
});

export const updateAnswerSchema = object({
  ...payload,
  ...params,
});
export const deleteAnswerSchema = object({
  ...params,
});
export const getAnswerSchema = object({
  ...params,
});

export type createAnswerInput = TypeOf<typeof createAnswerSchema>;
export type updateAnswerInput = TypeOf<typeof updateAnswerSchema>;
export type readAnswerInput = TypeOf<typeof getAnswerSchema>;
export type deleteAnswerInput = TypeOf<typeof deleteAnswerSchema>;
