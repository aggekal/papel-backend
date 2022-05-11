import { object, string, TypeOf, boolean, number } from "zod";
const payload = {
  body: object({
    lessonId: string({
      required_error: "lessonId is required",
    }),
    category: string({
      required_error: "category is required",
    }),
    description: string({
      required_error: "body is required",
    }),
    time: string({
      required_error: "time is required",
    }),
    difficulty: string({
      required_error: "difficulty is required",
    }),
    penalty: boolean({
      required_error: "penalty is required",
    }),
    chapter: string({
      required_error: "difficulty is required",
    }),
    score: string({
      required_error: "score is required",
    }),
    correctAnswers: string({
      required_error: "correct answers are required",
    }).array(),
    availableAnswers: string({
      required_error: "availbale answers are required",
    }).array(),
  }),
};

const params = {
  params: object({
    _id: string({
      required_error: " id is required",
    }),
  }),
};

const categoryParams = {
  body: object({
    category: string({
      required_error: "category is required",
    }),
    lessonId: string({
      required_error: "lessonId is required",
    }),
  }),
};

const difficultyPayload = {
  body: object({
    difficulty: string({
      required_error: "difficulty is required",
    }),
    lessonId: string({
      required_error: "lessonId is required",
    }),
  }),
};

export const createQuestionSchema = object({
  ...payload,
});

export const updateQuestionSchema = object({
  ...payload,
  ...params,
});
export const deleteQuestionSchema = object({
  ...params,
});
export const getQuestionSchema = object({
  ...params,
});

export const getQuestionByCategorySchema = object({
  ...categoryParams,
});

export const getQuestionByDifficultySchema = object({
  ...difficultyPayload,
});

export const getQuestionsByLessonSchema = object({
  ...params,
});

export type createQuestionInput = TypeOf<typeof createQuestionSchema>;
export type updateQuestionInput = TypeOf<typeof updateQuestionSchema>;
export type readQuestionInput = TypeOf<typeof getQuestionSchema>;
export type deleteQuestionInput = TypeOf<typeof deleteQuestionSchema>;
export type getQuestionByCategoryInput = TypeOf<
  typeof getQuestionByCategorySchema
>;
export type getQuestionByDifficultyInput = TypeOf<
  typeof getQuestionByDifficultySchema
>;
export type getQuestionsByLessonInput = TypeOf<
  typeof getQuestionsByLessonSchema
>;
