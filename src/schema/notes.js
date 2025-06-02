import { z } from "zod";

// TODO: create the title and content schema, 
// Make sure the title is required and the content is required
// Make sure the title is max 50 characters and the content is max 500 characters

// 👇 Schema definition using Zod for note validation
export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required") // Ensures the title field is not empty
    .max(50, "Title must be at most 50 characters"), // Limits title length to 50

  content: z
    .string()
    .min(1, "Content is required") // Ensures the content field is not empty
    .max(500, "Content must be at most 500 characters"), // Limits content length to 500
});
