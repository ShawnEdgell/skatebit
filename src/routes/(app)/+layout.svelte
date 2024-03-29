<script lang="ts">
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import SidebarCard from '$lib/components/SidebarCard.svelte';
</script>

<div class="mx-auto w-full h-full flex justify-center">
	<!-- (Left Sidebar) -->
	<div class="hidden md:flex fixed top-0 left-0 mt-[4.5rem] h-full w-[22rem]">
		<SidebarLeft />
	</div>
	<!-- (Main Content) -->
	<div class="md:ml-[22rem] xl:mr-[22rem] space-y-5 w-full max-w-4xl">
		<slot />
	</div>
	<!-- (Right Sidebar) -->
	<div class="overflow-y-scroll hidden xl:block fixed top-0 mt-6 right-0 h-full w-[22rem] p-4">
		<SidebarCard />
		<TableOfContents>
			<h1>On the Page</h1>
		</TableOfContents>
	</div>
</div>
