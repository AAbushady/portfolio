export interface RSNavItem {
	label: string;
	href: string;
	/** Marks the section the visitor is in (aria-current + green). */
	current?: boolean | undefined;
}

/**
 * The standard resonance nav: the three sections, the resume entry, the
 * page's audience anchor (every resonance page ends in one), and EXIT to the
 * page's terminal twin.
 */
export function buildRSNav(
	opts: { current?: 'work' | 'log' | 'about' | undefined; exitHref?: string | undefined } = {}
): RSNavItem[] {
	const { current, exitHref = '/' } = opts;
	return [
		{ label: 'Work', href: '/resonance/work/', current: current === 'work' },
		{ label: 'Log', href: '/resonance/blog/', current: current === 'log' },
		{ label: 'About', href: '/resonance/about/', current: current === 'about' },
		{ label: 'Resume', href: '/resonance/work/resume/' },
		{ label: 'Audience', href: '#audience' },
		{ label: 'Exit', href: exitHref },
	];
}
