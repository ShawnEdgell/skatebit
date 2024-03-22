<script lang="ts">
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import AppRail from '$lib/components/AppRail.svelte';
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="hidden sm:block fixed top-0 left-0 mt-14 h-full w-56 bg-red-900">
		<AppRail />
	</div>
	<div class="sm:ml-56 lg:mr-56 space-y-5 max-w-4xl">
		<slot />
	</div>
	<div class="hidden lg:block fixed top-0 right-0 mt-14 h-full w-56 p-4">
		<TableOfContents>
			<h1>On the Page</h1>
		</TableOfContents>
	</div>
</div>
