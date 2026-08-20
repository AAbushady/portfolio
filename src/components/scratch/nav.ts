export interface SCNavItem {
	label: string;
	href: string;
	/** Marks the section the visitor is in (aria-current + white). */
	current?: boolean | undefined;
	/** EXIT gets the red word-echo treatment. */
	exit?: boolean | undefined;
}

/**
 * The standard scratch nav: the three sections, the resume entry, and EXIT to
 * the page's terminal twin (the way out of the dark place).
 */
export function buildSCNav(
	opts: { current?: 'work' | 'log' | 'about' | undefined; exitHref?: string | undefined } = {}
): SCNavItem[] {
	const { current, exitHref = '/' } = opts;
	return [
		{ label: 'Work', href: '/scratch/work/', current: current === 'work' },
		{ label: 'Log', href: '/scratch/blog/', current: current === 'log' },
		{ label: 'About', href: '/scratch/about/', current: current === 'about' },
		{ label: 'Resume', href: '/scratch/work/resume/' },
		{ label: 'EXIT', href: exitHref, exit: true },
	];
}
