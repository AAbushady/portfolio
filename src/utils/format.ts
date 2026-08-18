/**
 * Format a frontmatter date as ISO "YYYY-MM-DD" for the mono metadata lines.
 * toISOString is inherently UTC, matching how YAML parses frontmatter
 * timestamps, so the rendered day never depends on the build machine.
 */
export function formatDateISO(date: Date): string {
	return date.toISOString().slice(0, 10);
}
