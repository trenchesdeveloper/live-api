import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }).min(6, "password must be at least 6 characters"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwordConfirmation must match password",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "passwordConfirmation"
>;
