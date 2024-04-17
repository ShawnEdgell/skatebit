<script lang="ts">
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import SidebarCard from '$lib/components/SidebarCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="mx-auto w-full flex justify-between">
	<!-- (Left Sidebar) -->
	<div class="hidden md:flex fixed top-0 left-0 mt-[4.5rem] h-full w-[22rem]">
		<SidebarLeft />
	</div>
	<!-- (Main Content) -->
	<div class="flex justify-center w-full">
		<div class="space-y-5 p-4 w-full max-w-4xl md:ml-[22rem] xl:pr-0">
			<slot />
		</div>
	</div>
	<!-- (Right Sidebar) -->
	<div class="hidden xl:flex sticky top-0 h-full px-4 justify-end">
		<div class="w-[22rem] flex flex-col justify-end overflow-y-auto">
			<div class="space-y-6 my-16 px-4">
				<SidebarCard />
				<TableOfContents>
					<h1>On the Page</h1>
				</TableOfContents>
			</div>
		</div>
	</div>
</div>
<!-- (Footer) -->
<div
	class="flex items-center justify-center md:justify-end h-[22rem] p-4 md:pl-[23rem] sm:p-16 bg-surface-50-900-token"
>
	<Footer />
</div>
