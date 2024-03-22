<script lang="ts">
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import SidebarCard from '$lib/components/SidebarCard.svelte';
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="hidden sm:flex fixed top-0 left-0 mt-16 h-full w-72">
		<SidebarLeft />
	</div>
	<div class="sm:ml-72 lg:mr-72 space-y-5 max-w-4xl">
		<slot />
	</div>
	<div class="hidden lg:block fixed top-0 right-0 mt-8 h-full w-72 p-4">
		<SidebarCard />
		<TableOfContents>
			<h1>On the Page</h1>
		</TableOfContents>
	</div>
</div>
