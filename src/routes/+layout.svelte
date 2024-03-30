<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';

	import { AppShell, Drawer, initializeStores } from '@skeletonlabs/skeleton';

	import Navigation from '$lib/components/Navigation.svelte';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import type { AfterNavigate } from '@sveltejs/kit';
	import { afterNavigate } from '$app/navigation';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	afterNavigate((params: AfterNavigate) => {
		const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<Drawer>
	<SidebarLeft />
</Drawer>

<AppShell regionPage="scroll-smooth overscroll-none">
	<svelte:fragment slot="header">
		<div class="shadow-xl">
			<Navigation />
		</div>
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div class="flex flex-col h-full w-full items-center justify-center space-y-5 p-4 xl:pr-0">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
