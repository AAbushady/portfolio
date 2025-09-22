import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md', }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional().default('Portfolio project preview'),
		}),
	}),
	blog: defineCollection({
		// Load Markdown files in the src/content/blog directory.
		loader: glob({ base: './src/content/blog', pattern: '**/*.md', }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()),
			status: z.enum(['draft', 'published']).default('published'),
			img: z.string().optional(),
			img_alt: z.string().optional().default('Blog post preview'),
		}),
	}),
};
