<script lang="ts">
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import SidebarLeft from './SidebarLeft.svelte';
	import SidebarCard from './SidebarCard.svelte';
</script>

<div class="w-full h-full flex justify-center">
	<div class="hidden md:flex fixed top-0 left-0 mt-16 h-full w-80">
		<SidebarLeft />
	</div>
	<div class="md:ml-80 xl:mr-80 space-y-5 w-full max-w-4xl">
		<slot />
	</div>
	<div class="overflow-y-scroll hidden xl:block fixed top-0 mt-6 right-0 h-full w-80 p-4">
		<SidebarCard />
		<TableOfContents>
			<h1>On the Page</h1>
		</TableOfContents>
	</div>
</div>
