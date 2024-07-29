import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Username is Required",
    }),
    name: string({
      required_error: "Name is Required",
    }),
    password: string({
      required_error: "Password is Required",
    }).min(6, "Password is too short min 6"),
    passwordConfirmation: string({
      required_error: "Confirm Password is Required",
    }),
    email: string({ required_error: "Email is required" }).email(
      "Email is not valid "
    ),
    phoneNumber: string({ required_error: "Phone Number is required" }),

    role: string({ required_error: "Role is required" }),
   
  }).refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      message: "Password does not match passwordConfirmation",
      path: ["passwordConfirmation"],
    }
  ),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
