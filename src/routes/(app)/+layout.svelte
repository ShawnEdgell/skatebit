<script lang="ts">
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import SidebarCard from '$lib/components/SidebarCard.svelte';
</script>

<div class="mx-auto w-full flex justify-between">
	<!-- (Left Sidebar) -->
	<div class="hidden md:flex fixed top-0 left-0 mt-[4.5rem] h-full w-[22rem]">
		<SidebarLeft />
	</div>
	<!-- (Main Content) -->
	<div class="w-full flex justify-center">
		<div class="md:ml-[22rem] space-y-5 p-4 xl:pr-0 w-full max-w-4xl">
			<slot />
		</div>
	</div>
	<!-- (Right Sidebar) -->
	<div class="hidden xl:block sticky top-0 h-full px-4 justify-end">
		<div class="flex flex-col justify-end w-[22rem]">
			<div class="space-y-6 my-16">
				<SidebarCard />
				<TableOfContents>
					<h1>On the Page</h1>
				</TableOfContents>
			</div>
		</div>
	</div>
</div>
