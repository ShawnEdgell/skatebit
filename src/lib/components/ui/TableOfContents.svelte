<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	type Heading = {
		id: string;
		text: string;
		level: number;
	};

	const headings = writable<Heading[]>([]);
	const activeId = writable<string | null>(null);

	let observer: IntersectionObserver;
	let navbarOffset = 140; // Adjust this to match your sticky navbar height

	// Generates and updates the TOC
	async function generateTOC() {
		await tick();

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

			return {
				id,
				text: el.textContent || '',
				level: el.tagName === 'H2' ? 2 : 3
			};
		});

		headings.set(headingList);
		setupObserver();
	}

	// Sets up IntersectionObserver to highlight active heading
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

	// Scrolls to heading with sticky offset
	function scrollToHeading(id: string) {
		const el = document.getElementById(id);
		if (el) {
			const yOffset = -navbarOffset;
			const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	}

	// Expose refresh function
	export function refreshTOC() {
		generateTOC();
	}

	// Trigger TOC generation on route change
	page.subscribe(() => generateTOC());

	// Listen to global refresh event
	function handleRefreshEvent() {
		generateTOC();
	}

	onMount(() => {
		generateTOC();
		window.addEventListener('refresh-toc', handleRefreshEvent);
	});

	onDestroy(() => {
		window.removeEventListener('refresh-toc', handleRefreshEvent);
	});
</script>

<h2 class="text-content mt-12 font-semibold">On this page</h2>

<ul class="space-y-2">
	{#each $headings as { id, text, level }}
		<li class="ml-{level === 3 ? 4 : 0}">
			<button
				type="button"
				on:click={() => scrollToHeading(id)}
				class="btn btn-ghost btn-sm w-full justify-start text-left normal-case
					{$activeId === id ? 'btn-active btn-primary' : ''}"
				title={text}
			>
				{text.length > 35 ? text.slice(0, 35) + '…' : text}
			</button>
		</li>
	{/each}
</ul>
