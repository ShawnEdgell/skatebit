<script lang="ts">
	import { navItems } from '../constants/navItems';
</script>

<footer class="flex flex-col items-center gap-6 w-full bg-surface-100-800-token p-16 sm:p-20">
	<nav
		class="flex flex-col font-semibold sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center justify-center"
	>
		{#each navItems as { href, label }}
			<a {href} class="underline hover:no-underline" data-sveltekit-preload-data="hover">
				{label}
			</a>
		{/each}
	</nav>
	<p class="text-center">©2024 Skatebit - Created by Milky 🥛</p>
</footer>
