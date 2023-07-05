import z from "zod";

export const createRoomSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .max(15, "Name is too long - must be below 15 characters"),
    description: z
      .string({
        required_error: "Description is required",
      })
      .max(50, "Description is too long - must be below 50 characters"),
  }),
});

export type CreateRoomInput = z.TypeOf<typeof createRoomSchema>;
