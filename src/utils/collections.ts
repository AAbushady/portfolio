import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * All work projects: entries with a `featured` rank come first (1 = top,
 * ascending), everything unranked follows newest-first.
 */
export async function getSortedProjects(): Promise<CollectionEntry<'work'>[]> {
	return (await getCollection('work')).sort(compareProjects);
}

// Featured ranks (ascending) outrank everything; ties, including the
// "both unranked" case, fall through to newest-first.
function compareProjects(a: CollectionEntry<'work'>, b: CollectionEntry<'work'>): number {
	const aRank = a.data.featured ?? Infinity;
	const bRank = b.data.featured ?? Infinity;

	if (aRank !== bRank)
		return aRank - bRank;
	
	return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
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
