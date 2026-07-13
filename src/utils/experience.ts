/** The calendar year Alex's professional software career started. */
export const CAREER_START_YEAR = 2020;

/**
 * Years of professional experience, displayed as "N+" across the site.
 * Called at build time (remark plugin, work project pages) and again in the
 * browser (BaseLayout script) so the number stays fresh between deploys.
 */
export function yearsOfExperience(): number {
	return new Date().getFullYear() - CAREER_START_YEAR;
}
