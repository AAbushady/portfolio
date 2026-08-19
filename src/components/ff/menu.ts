export interface FFMenuItem {
	label: string;
	href: string;
	/** Shown in the help bar while this item is selected. */
	help: string;
	/** 'scroll' smooth-scrolls to href's fragment; 'sound' toggles menu blips. */
	action?: 'scroll' | 'sound' | undefined;
}

type FFSection = 'home' | 'work' | 'blog' | 'about';

/**
 * The standard FF page menu: every section except the current one, then
 * RESUME, CONTACT (scrolls to the page's dialog window), the sound toggle
 * (label is corrected client-side to the stored preference), and EXIT to the
 * page's terminal twin.
 */
export function buildFFMenu(current: FFSection, exitHref: string): FFMenuItem[] {
	const sections: Array<{ key: FFSection; item: FFMenuItem }> = [
		{ key: 'home', item: { label: 'HOME', href: '/ff/', help: 'Back to the main menu.' } },
		{ key: 'work', item: { label: 'WORK', href: '/ff/work/', help: 'Completed quests: shipped products, prototypes, and mods.' } },
		{ key: 'blog', item: { label: 'BLOG', href: '/ff/blog/', help: 'The journal. Dev logs from the current playthrough.' } },
		{ key: 'about', item: { label: 'ABOUT', href: '/ff/about/', help: 'The story so far.' } },
	];

	return [
		...sections.filter((s) => s.key !== current).map((s) => s.item),
		{ label: 'RESUME', href: '/ff/work/resume/', help: 'Character sheet. Printable, ATS-friendly.' },
		{ label: 'CONTACT', href: '#dialog', help: 'Speak with Alex. Opens the dialog window below.', action: 'scroll' },
		{ label: 'SOUND: OFF', href: '#', help: 'Toggle menu blips.', action: 'sound' },
		{ label: 'EXIT', href: exitHref, help: 'Return to the terminal.' },
	];
}
