import z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    image: z.string({
      required_error: "Image is required",
    }),
    name: z
      .string({
        required_error: "Name is required",
      })
      .max(18, "Name is too long - must be below 18 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
