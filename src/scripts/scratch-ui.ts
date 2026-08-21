/**
 * Interaction layer for the Scratch theme (/scratch/ routes): the typed
 * manuscript line, scroll reveals, and the visitor (the full-screen static
 * jump-cut). Called once per page from ScratchLayout; every hook is optional
 * so pages can include any subset.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The hero's manuscript line types itself onto the page.
function initTypedLine(): void {
	const el = document.getElementById('sc-typed');
	if (!el) return;
	const line = el.dataset.line ?? '';
	if (reduced) {
		el.textContent = line;
		return;
	}
	let i = 0;
	window.setTimeout(() => {
		const timer = window.setInterval(() => {
			el.textContent = line.slice(0, ++i);
			if (i >= line.length) window.clearInterval(timer);
		}, 45);
	}, 900);
}

function initReveals(): void {
	const chapters = document.querySelectorAll<HTMLElement>('.sc-reveal');
	if (chapters.length === 0) return;
	if (reduced) {
		chapters.forEach((el) => el.classList.add('on'));
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
	chapters.forEach((el) => io.observe(el));
}

// ---- the visitor ----
// fireVisit owns WHAT a visitation is (one ~300ms cut of static and the
// face); nextVisitDelay owns WHEN. Auto-scheduling is disabled entirely under
// prefers-reduced-motion; the S key still summons him deliberately.
function initVisitor(): void {
	const visit = document.getElementById('sc-visit');
	if (!visit) return;
	let visitCount = 0;

	// Once per tab session (same scope as the FF title screen); the storage
	// guard means page navigation within /scratch/ doesn't re-arm him.
	const VISITED_KEY = 'sc-visited';
	const hasVisited = (): boolean => {
		try {
			return sessionStorage.getItem(VISITED_KEY) === '1';
		} catch {
			return false;
		}
	};
	const markVisited = (): void => {
		try {
			sessionStorage.setItem(VISITED_KEY, '1');
		} catch {
			// Storage blocked: he may visit again next page. Acceptable.
		}
	};

	const fireVisit = (): void => {
		if (visit.classList.contains('on')) return;
		visit.classList.add('on');
		window.setTimeout(() => visit.classList.remove('on'), 300);
	};

	/*
	 * Pacing the haunting. Given how many times he has already appeared this
	 * page-view, return the delay in milliseconds until his next appearance,
	 * or null to stop appearing for good. He comes exactly once, 20-60
	 * seconds in, so the reader has settled and can't brace for him.
	 */
	function nextVisitDelay(count: number): number | null {
		if (count >= 1 || hasVisited()) return null;
		return 20_000 + Math.random() * 40_000;
	}

	function scheduleVisit(): void {
		const delay = nextVisitDelay(visitCount);
		if (delay == null || !Number.isFinite(delay) || delay <= 0) return;
		// Whatever the pacing says, never fire faster than 1.5s apart.
		window.setTimeout(() => {
			if (!document.hidden) {
				visitCount++;
				markVisited();
				fireVisit();
			}
			scheduleVisit();
		}, Math.max(1500, delay));
	}
	if (!reduced) scheduleVisit();

	// he also comes when called
	window.addEventListener('keydown', (e) => {
		if ((e.key === 's' || e.key === 'S') && !e.repeat && !e.ctrlKey && !e.metaKey && !e.altKey) {
			const target = e.target as HTMLElement | null;
			if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
			fireVisit();
		}
	});
}

export function initScratch(): void {
	initTypedLine();
	initReveals();
	initVisitor();
}
