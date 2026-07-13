import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/** All work projects, newest first. */
export async function getSortedProjects(): Promise<CollectionEntry<'work'>[]> {
	return (await getCollection('work')).sort(
		(a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
	);
}

/**
 * The only sanctioned way to read the blog collection: published posts only,
 * newest first. Every blog surface (listings, routes, future RSS/tag pages)
 * must go through this so a draft can never leak onto the static site.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', ({ data }) => data.status === 'published');
	return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
