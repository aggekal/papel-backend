import { object, string, TypeOf } from "zod";
import { validateUOPmail } from "../utils/validateEmail";
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    surname: string({
      required_error: "surname is required",
    }),
    username: string({
      required_error: "User name is required",
    }),
    phoneNumber: string({
      required_error: "phoneNumber name is required",
    }),
    role: string({
      required_error: "user role name is required",
    }),
    registerNumber: string().optional(),
    password: string({
      required_error: "pass is required",
    })
      .min(5, "Pass too short")
      .max(15, "Pass too long"),
    passwordConfirmation: string({
      required_error: "pass confirmation is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("Not valid email"),
  })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords dont match",
      path: ["passwordConfirmation"],
    })
    .refine((data) => validateUOPmail(data.email), {
      message: "Email must be of UOP provider",
      path: ["email"],
    }),
});

const params = {
  params: object({
    _id: string({
      required_error: "user id is required",
    }),
  }),
};

export const updateUserPasswordSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }),
    oldPassword: string({
      required_error: "old pass is required",
    }),
    password: string({
      required_error: "pass is required",
    })
      .min(5, "Pass too short")
      .max(15, "Pass too long"),
    passwordConfirmation: string({
      required_error: "pass confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords dont match",
    path: ["passwordConfirmation"],
  }),
});

export const forgotUserPasswordSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

export type UpdateUserPasswordInput = Omit<
  TypeOf<typeof updateUserPasswordSchema>,
  "body.passwordConfirmation"
>;

export type ForgotUserPasswordInput = TypeOf<typeof forgotUserPasswordSchema>;
