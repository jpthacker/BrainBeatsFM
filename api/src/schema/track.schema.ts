import z from "zod";

export const createTrackSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Name is required",
    }),
    owner: z.string({
      required_error: "Description is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    description: z
      .string({
        required_error: "Description is required",
      })
      .max(50, "Description is too long - must be below 50 characters"),
    url: z
      .string({
        required_error: "Url is required",
      })
      .url("Url not valid"),
    votes: z.number().default(0),
    userVotes: z.array(z.string()).default([]),
  }),
});

export type CreateTrackInput = z.TypeOf<typeof createTrackSchema>;

// TO DO: Fix default validation value error (votes, userVotes)
