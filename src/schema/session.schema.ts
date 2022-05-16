import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({

    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters"),

})
});

export type CreateSessionInput =
  TypeOf<typeof createSessionSchema>
