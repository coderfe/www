import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tldr: z.string(),
      // Transform string to Date object
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      cover: image().optional(),
    }),
});

export const collections = { blog };
