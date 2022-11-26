import type { MarkdownInstance } from "astro";

export interface Frontmatter {
  title: string;
  date: string;
  tldr: string;
  tags: string[];
}

export type Post = MarkdownInstance<Frontmatter>
