// ✅ UPDATED: schema/notes.js
// -----------------------------
// Add support for optional tags field with constraints

import { z } from "zod";

export const noteSchema = z.object({
  // TODO: create the title and content schema, 
  // Make sure the title is required and the content is required
  // Make sure the title is max 50 characters and the content is max 500 characters

  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be 50 characters or less"),

  content: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content must be 500 characters or less"),

  // 👇 Optional array of tags - strings, each tag max 15 characters, limit 5 tags max
  tags: z
    .array(z.string().max(15, "Each tag must be 15 characters or less"))
    .max(5, "You can only add up to 5 tags")
    .optional(),
});
