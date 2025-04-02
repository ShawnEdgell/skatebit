<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';

	type Heading = {
		id: string;
		text: string;
		level: number;
	};

	const headings = writable<Heading[]>([]);
	const activeId = writable<string | null>(null);

	let observer: IntersectionObserver;
	const navbarOffset = 110;

	// Generate and update the Table of Contents
	async function generateTOC() {
		if (!browser) return;

		await tick();
		setTimeout(() => {
			const selector = 'main h2, main h3';
			const elements = Array.from(document.querySelectorAll(selector));

			const headingList = elements.map((el) => {
				const id =
					el.id ||
					el.textContent
						?.toLowerCase()
						.replace(/\s+/g, '-')
						.replace(/[^\w-]/g, '') ||
					'';
				el.id = id;

				// ✅ Add scroll-margin-top to prevent jump cutoffs
				el.classList.add('scroll-mt-[110px]');

				return {
					id,
					text: el.textContent || '',
					level: el.tagName === 'H2' ? 2 : 3
				};
			});

			headings.set(headingList);
			setupObserver();
		}, 50); // small delay to wait for DOM layout
	}

	function setupObserver() {
		observer?.disconnect();

		const options = {
			rootMargin: `-${navbarOffset + 8}px 0px -80% 0px`,
			threshold: 0
		};

		observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					activeId.set(entry.target.id);
					break;
				}
			}
		}, options);

		document.querySelectorAll('main h2, main h3').forEach((el) => observer.observe(el));
	}

	function scrollToHeading(id: string) {
		const el = document.getElementById(id);
		if (el) {
			setTimeout(() => {
				const yOffset = -navbarOffset;
				const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
				window.scrollTo({ top: y, behavior: 'smooth' });
			}, 0); // slight delay ensures scroll is smooth and after reflow
		}
	}

	// Expose refresh function
	export function refreshTOC() {
		generateTOC();
	}

	onMount(() => {
		if (!browser) return;
		generateTOC();
		window.addEventListener('refresh-toc', generateTOC);
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('refresh-toc', generateTOC);
	});

	if (browser) {
		page.subscribe(() => generateTOC());
	}
</script>

<!-- TOC UI -->
<div class="text-content mt-4 font-semibold">On this page</div>

<ul class="space-y-2">
	{#each $headings as { id, text, level }}
		<li class="ml-0" class:ml-4={level === 3}>
			<button
				type="button"
				on:click={() => scrollToHeading(id)}
				class="btn btn-ghost btn-sm w-full justify-start text-left normal-case"
				class:btn-active={$activeId === id}
				class:btn-primary={$activeId === id}
				title={text}
			>
				{text.length > 38 ? text.slice(0, 38) + '…' : text}
			</button>
		</li>
	{/each}
</ul>
