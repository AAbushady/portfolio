/** The calendar year Alex's professional software career started. */
export const CAREER_START_YEAR = 2020;

/**
 * Years of professional experience, displayed as "N+" across the site.
 * Called at build time (remark plugin, entry pages) and again in the browser
 * (BaseLayout script), which refreshes the visible `.years-exp` spans between
 * deploys. Values baked into meta tags and JSON-LD stay at the build-time
 * number until the next deploy.
 */
export function yearsOfExperience(): number {
	return new Date().getFullYear() - CAREER_START_YEAR;
}

const PLACEHOLDER = /\{\{yearsOfExperience\}\}/g;

/**
 * Replace every {{yearsOfExperience}} placeholder in `text` with "N+".
 * The html variant wraps the value in the span BaseLayout's client script
 * refreshes; use it only where the result is rendered as HTML.
 */
export function substituteYears(text: string, opts: { html?: boolean } = {}): string {
	const years = yearsOfExperience();
	const replacement = opts.html ? `<span class="years-exp">${years}+</span>` : `${years}+`;
	return text.replace(PLACEHOLDER, replacement);
}
