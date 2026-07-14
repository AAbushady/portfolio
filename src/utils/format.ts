/**
 * Format a frontmatter date for display, e.g. "Sep 27, 2025".
 *
 * Frontmatter timestamps are parsed by YAML as UTC, so both the locale and
 * time zone are pinned here - otherwise the rendered date depends on the
 * build machine (a US-timezone build shows the previous calendar day).
 */
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC',
	});
}
