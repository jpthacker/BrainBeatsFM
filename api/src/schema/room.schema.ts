import z from "zod";

export const createRoomSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .max(15),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

export type CreateRoomInput = z.TypeOf<typeof createRoomSchema>;
