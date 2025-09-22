---
title: "Building a Development Blog with Astro Content Collections"
description: "How I implemented a blog system within my portfolio to track project development progress and share technical insights."
publishDate: 2025-09-22 12:00:00
tags: ["Astro", "Web Development", "Portfolio", "Content Management"]
status: "published"
img: "/assets/portfolio-blog-preview.jpg"
img_alt: "Screenshot showing the new blog interface integrated into the portfolio"
---

## Why Add a Blog to My Portfolio?

As I work on various personal projects, I often find myself making interesting discoveries, solving complex problems, and learning new techniques. Rather than keeping these insights to myself, I wanted a way to document and share my development journey.

The goal was to create a blog that would:

- **Track project evolution**: Document how projects develop over time
- **Share technical insights**: Explain interesting problems and solutions
- **Connect work and learning**: Link blog posts to portfolio projects
- **Maintain consistency**: Use the same design system as my portfolio

## Technical Implementation

### Content Collection Schema

I extended Astro's content collection system to support blog posts alongside my existing work projects. The blog schema includes several fields specifically designed for development journaling:

```typescript
blog: defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    project: z.string().optional(), // Link to related work project
    status: z.enum(['draft', 'published']).default('published'),
    img: z.string().optional(),
    img_alt: z.string().optional().default('Blog post preview'),
  }),
}),
```

The key additions for development blogging:

- **`updatedDate`**: Track when posts are revised as projects evolve
- **`project`**: Link blog posts to related portfolio projects
- **`status`**: Support draft posts for work-in-progress documentation

### Component Architecture

Following my existing portfolio patterns, I created a `BlogPreview` component that displays blog post metadata in a card format. Unlike portfolio projects, blog posts handle optional images gracefully and emphasize metadata like publish dates and project connections.

The blog post template includes structured data markup for SEO, automatically generating Schema.org `BlogPosting` metadata with proper authorship and publication information.

## Development Workflow

The blog integrates seamlessly with my existing Astro development workflow:

1. **Write in Markdown**: Blog posts use standard Markdown with frontmatter
2. **Automatic routing**: Dynamic routes generate pages for each published post
3. **Type safety**: TypeScript interfaces ensure consistent data structure
4. **Preview system**: Draft posts can be written but won't appear publicly

## Future Enhancements

Some ideas for expanding the blog system:

- **Series support**: Group related posts about the same project
- **Code snippet highlighting**: Enhanced syntax highlighting for technical posts
- **Cross-linking**: Automatic links between related blog posts and portfolio projects
- **RSS feed**: Generate an RSS feed for blog subscribers

## Conclusion

This blog implementation demonstrates how Astro's content collection system can be extended to support multiple content types while maintaining type safety and design consistency. The integration with my existing portfolio creates a cohesive space for both showcasing completed work and documenting the development process.

The result is a platform where I can share not just what I've built, but how and why I built it - making the portfolio more valuable for both myself and anyone interested in my development journey.