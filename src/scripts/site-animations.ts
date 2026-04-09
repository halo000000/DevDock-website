import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initSiteAnimations(): void {
	if (prefersReducedMotion()) return;

	gsap.registerPlugin(ScrollTrigger);

	const hero = document.querySelector('[data-hero-intro]');
	if (hero) {
		const parts = hero.querySelectorAll('[data-hero-line]');
		gsap.fromTo(
			parts,
			{ opacity: 0, y: 28 },
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				stagger: 0.09,
				ease: 'power3.out',
				delay: 0.08,
			}
		);
	}

	const heroVis = document.querySelector('[data-hero-visual]');
	if (heroVis) {
		gsap.fromTo(
			heroVis,
			{ opacity: 0, y: 32 },
			{ opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.2 }
		);
	}

	gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
		gsap.fromTo(
			el,
			{ opacity: 0, y: 36 },
			{
				opacity: 1,
				y: 0,
				duration: 0.65,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					toggleActions: 'play none none none',
				},
			}
		);
	});

	gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((container) => {
		const kids = container.querySelectorAll<HTMLElement>('[data-reveal-item]');
		if (!kids.length) return;
		gsap.fromTo(
			kids,
			{ opacity: 0, y: 32 },
			{
				opacity: 1,
				y: 0,
				duration: 0.55,
				stagger: 0.07,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: container,
					start: 'top 88%',
					toggleActions: 'play none none none',
				},
			}
		);
	});
}

if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => initSiteAnimations());
	} else {
		initSiteAnimations();
	}
}
