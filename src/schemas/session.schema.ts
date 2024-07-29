import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    password: string({
      required_error: "Password is Required",
    }).min(6, "Password is too short min 6"),
    username: string({ required_error: "Username is required" }),
  }),
});
