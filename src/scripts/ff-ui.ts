/**
 * Interaction layer for the FF theme (/ff/ routes): menu blips, the jumping
 * cursor, the help bar, the title screen, and the typewriter dialog. Called
 * once per page from FFLayout; every hook is optional so pages can include
 * any subset of the FF windows.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- sound ---------- */

// Separate key from the site's `theme` storage, which only ThemeToggle may write.
const SOUND_KEY = 'ff-sound';

// Sound is opt-in: only an explicit stored "on" enables it. localStorage can
// throw (cookies disabled); treat that as "no preference".
function storedSoundOn(): boolean {
	try {
		return localStorage.getItem(SOUND_KEY) === 'on';
	} catch {
		return false;
	}
}

let soundOn = storedSoundOn();
let audioCtx: AudioContext | null = null;

function blip(freq: number, dur: number, delay = 0): void {
	if (!soundOn) return;
	try {
		audioCtx = audioCtx ?? new AudioContext();
		if (audioCtx.state === 'suspended') void audioCtx.resume();
		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();
		const t = audioCtx.currentTime + delay;
		osc.type = 'square';
		osc.frequency.value = freq;
		gain.gain.setValueAtTime(0.045, t);
		gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
		osc.connect(gain).connect(audioCtx.destination);
		osc.start(t);
		osc.stop(t + dur);
	} catch {
		// Audio unavailable; the theme stays silent.
	}
}

const moveBlip = (): void => blip(1080, 0.055);
const confirmBlip = (): void => {
	blip(1320, 0.07);
	blip(1760, 0.1, 0.07);
};

// The sound toggle lives in the menu itself as a "SOUND: ON/OFF" item; its
// label is the state indicator, so re-render every such item on toggle.
function initSound(): void {
	const render = (): void => {
		document.querySelectorAll<HTMLAnchorElement>('[data-action="sound"]').forEach((el) => {
			el.textContent = `SOUND: ${soundOn ? 'ON' : 'OFF'}`;
		});
	};

	toggleSoundRef = (): void => {
		soundOn = !soundOn;
		try {
			localStorage.setItem(SOUND_KEY, soundOn ? 'on' : 'off');
		} catch {
			// Preference just won't persist.
		}
		render();
		if (soundOn) confirmBlip();
	};

	render();
}

let toggleSoundRef: (() => void) | null = null;

/* ---------- title screen ---------- */

const TITLE_SEEN_KEY = 'ff-title-seen';

function initTitle(): void {
	const title = document.querySelector<HTMLElement>('.ff-title');
	if (!title) return;

	// Replay the title screen once per tab session, not on every return trip.
	let seen = false;
	try {
		seen = sessionStorage.getItem(TITLE_SEEN_KEY) === '1';
	} catch {
		seen = false;
	}
	if (seen) {
		title.remove();
		return;
	}

	const dismiss = (): void => {
		if (title.classList.contains('gone')) return;
		confirmBlip();
		title.classList.add('gone');
		try {
			sessionStorage.setItem(TITLE_SEEN_KEY, '1');
		} catch {
			// Fine; they get the title screen again next page.
		}
	};

	title.addEventListener('click', dismiss);
	document.addEventListener('keydown', (e) => {
		if (!title.classList.contains('gone')) {
			e.preventDefault();
			dismiss();
		}
	});
}

function titleShowing(): boolean {
	const title = document.querySelector<HTMLElement>('.ff-title');
	return title !== null && !title.classList.contains('gone');
}

/* ---------- help bar ---------- */

function initHelp(): void {
	const help = document.getElementById('ff-help');
	if (!help) return;

	const show = (target: EventTarget | null): void => {
		if (!(target instanceof Element)) return;
		const el = target.closest<HTMLElement>('[data-help]');
		if (el?.dataset.help) help.textContent = el.dataset.help;
	};

	// mouseover (unlike mouseenter) bubbles, so one listener covers every window.
	document.addEventListener('mouseover', (e) => show(e.target));
	document.addEventListener('focusin', (e) => show(e.target));
}

/* ---------- menu cursor ---------- */

function flashThenNavigate(href: string): void {
	const flash = document.querySelector<HTMLElement>('.ff-flash');
	if (reduced || !flash) {
		window.location.href = href;
		return;
	}
	flash.classList.remove('go');
	void flash.offsetWidth;
	flash.classList.add('go');
	window.setTimeout(() => {
		window.location.href = href;
	}, 160);
}

function initMenu(menu: HTMLElement): void {
	const items = Array.from(menu.querySelectorAll('li'));
	const hand = menu.querySelector<SVGElement>('.ff-hand');
	if (!hand || items.length === 0) return;

	let sel = 0;

	const place = (): void => {
		const li = items[sel];
		const link = li?.querySelector('a');
		if (!li || !link) return;
		items.forEach((i) => i.classList.remove('selected'));
		li.classList.add('selected');
		hand.style.top = `${link.offsetTop + link.offsetHeight / 2 - 11}px`;
		const help = document.getElementById('ff-help');
		if (help && link.dataset.help) help.textContent = link.dataset.help;
	};

	const move = (dir: number): void => {
		sel = (sel + dir + items.length) % items.length;
		moveBlip();
		place();
	};

	const activate = (): void => {
		const link = items[sel]?.querySelector('a');
		if (!link) return;
		confirmBlip();
		const action = link.dataset.action;
		if (action === 'sound') {
			toggleSoundRef?.();
			return;
		}
		if (action === 'scroll') {
			const target = document.querySelector(link.getAttribute('href') ?? '');
			target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
			return;
		}
		flashThenNavigate(link.href);
	};

	items.forEach((li, i) => {
		const link = li.querySelector('a');
		if (!link) return;
		li.addEventListener('mouseenter', () => {
			if (sel !== i) {
				sel = i;
				moveBlip();
				place();
			}
		});
		link.addEventListener('focus', () => {
			sel = i;
			place();
		});
		link.addEventListener('click', (e) => {
			e.preventDefault();
			sel = i;
			place();
			activate();
		});
	});

	if (menu.dataset.ffMenu === 'primary') {
		document.addEventListener('keydown', (e) => {
			if (titleShowing()) return;
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				move(1);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				move(-1);
			} else if (e.key === 'Enter' && !(e.target instanceof HTMLAnchorElement)) {
				e.preventDefault();
				activate();
			}
		});
	}

	window.addEventListener('resize', place);
	place();
}

/* ---------- typewriter dialog ---------- */

function initDialog(): void {
	const dialog = document.querySelector<HTMLElement>('[data-ff-dialog]');
	if (!dialog) return;

	const text = dialog.querySelector<HTMLElement>('.ff-dialog-text');
	const adv = dialog.querySelector<HTMLElement>('.ff-adv');
	const choice = dialog.querySelector<HTMLElement>('.ff-choice');
	const line = dialog.dataset.line ?? '';
	const declined = dialog.dataset.declined ?? line;
	if (!text || !adv || !choice) return;

	const typeLine = (full: string): void => {
		adv.hidden = true;
		choice.style.visibility = 'hidden';
		const done = (): void => {
			adv.hidden = false;
			choice.style.visibility = 'visible';
		};
		if (reduced) {
			text.textContent = full;
			done();
			return;
		}
		text.textContent = '';
		let i = 0;
		const tick = (): void => {
			i += 1;
			text.textContent = full.slice(0, i);
			if (i % 3 === 0) blip(220 + (i % 5) * 30, 0.02);
			if (i < full.length) window.setTimeout(tick, 24);
			else done();
		};
		tick();
	};

	let typed = false;
	new IntersectionObserver((entries, obs) => {
		if (entries[0]?.isIntersecting && !typed) {
			typed = true;
			typeLine(line);
			obs.disconnect();
		}
	}, { threshold: 0.5 }).observe(dialog);

	dialog.querySelector('[data-ff-yes]')?.addEventListener('click', () => confirmBlip());
	dialog.querySelector<HTMLElement>('[data-ff-no]')?.addEventListener('click', (e) => {
		e.preventDefault();
		moveBlip();
		typeLine(declined);
	});
}

/* ---------- entry point ---------- */

export function initFF(): void {
	initSound();
	initTitle();
	initHelp();
	document.querySelectorAll<HTMLElement>('[data-ff-menu]').forEach(initMenu);
	initDialog();
}
