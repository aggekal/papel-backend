import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});
