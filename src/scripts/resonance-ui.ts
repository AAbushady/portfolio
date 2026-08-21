/**
 * Interaction layer for the Resonance theme (/resonance/ routes): the hero
 * boot sequence, scroll reveals with staggered plates, and the cursor-lit
 * seams on glass plating. Called once per page from ResonanceLayout; every
 * hook is optional so pages can include any subset.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initBoot(): void {
	const hero = document.querySelector<HTMLElement>('.rs-hero');
	if (!hero) return;
	if (reduced) hero.classList.add('lit');
	else window.setTimeout(() => hero.classList.add('lit'), 250);
}

function initReveals(): void {
	const zones = document.querySelectorAll<HTMLElement>('.rs-reveal');
	if (zones.length === 0) return;
	if (reduced) {
		zones.forEach((el) => el.classList.add('on'));
		return;
	}
	// threshold is a fraction of the TARGET, so an entry page's single tall
	// article can never reach it on a phone; trigger on the viewport instead
	// (any pixel past the bottom 12% of the screen).
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('on');
					io.unobserve(entry.target);
				}
			});
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0 }
	);
	zones.forEach((el) => io.observe(el));
}

// Seam spotlight: each plate's edge gradient follows the pointer.
function initSeams(): void {
	document.querySelectorAll<HTMLElement>('.rs-glass').forEach((el) => {
		el.addEventListener('pointermove', (e) => {
			const rect = el.getBoundingClientRect();
			el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
			el.style.setProperty('--my', `${e.clientY - rect.top}px`);
		});
	});
}

export function initResonance(): void {
	initBoot();
	initReveals();
	initSeams();
}
