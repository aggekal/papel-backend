import { object, string, TypeOf } from "zod";
const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
    category: string({
      required_error: "category is required",
    }),
  }),
};

const params = {
  params: object({
    _id: string({
      required_error: "lesson id is required",
    }),
  }),
};

export const createLessonSchema = object({
  ...payload,
});

export const updateLessonSchema = object({
  ...payload,
  ...params,
});
export const deleteLessonSchema = object({
  ...params,
});
export const getLessonSchema = object({
  ...params,
});

export type createLessonInput = TypeOf<typeof createLessonSchema>;
export type updateLessonInput = TypeOf<typeof updateLessonSchema>;
export type readLessonInput = TypeOf<typeof getLessonSchema>;
export type deleteLessonInput = TypeOf<typeof deleteLessonSchema>;
