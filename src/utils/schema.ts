interface EntrySchemaOptions {
	type: 'CreativeWork' | 'BlogPosting';
	title: string;
	/** Plain-text description (placeholders already substituted). */
	description: string;
	/** Site-relative path with trailing slash, e.g. `/work/${entry.id}/`. */
	urlPath: string;
	publishDate: Date;
	updatedDate?: Date | undefined;
	tags: string[];
	/** Processed image src (`entry.data.img.src`), if the entry has one. */
	imageSrc?: string | undefined;
	/** Pass `Astro.site` so URLs follow the configured domain. */
	site: URL;
}

/** Schema.org JSON-LD for a work project or blog post detail page. */
export function buildEntrySchema(opts: EntrySchemaOptions): object {
	const person = { '@type': 'Person', name: 'Alex Abushady' };
	const base = {
		'@context': 'https://schema.org',
		description: opts.description,
		datePublished: opts.publishDate.toISOString(),
		...(opts.updatedDate && { dateModified: opts.updatedDate.toISOString() }),
		url: new URL(opts.urlPath, opts.site).href,
		keywords: opts.tags,
		...(opts.imageSrc && { image: new URL(opts.imageSrc, opts.site).href }),
	};
	return opts.type === 'BlogPosting'
		? { '@type': 'BlogPosting', headline: opts.title, author: person, ...base }
		: { '@type': 'CreativeWork', name: opts.title, creator: person, ...base };
}

/**
 * Serialize JSON-LD for a `<script>` tag: escapes `<` so content can never
 * terminate the script element early (JSON parsers read `<` back as `<`).
 */
export function jsonLdSerialize(data: object): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
