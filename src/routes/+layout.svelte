<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';

	import { AppShell, Drawer, initializeStores } from '@skeletonlabs/skeleton';

	import AppBar from '$lib/components/AppBar.svelte';
	import DrawerItems from '$lib/components/DrawerItems.svelte';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import type { AfterNavigate } from '@sveltejs/kit';
	import { afterNavigate } from '$app/navigation';

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
	<DrawerItems />
</Drawer>

<AppShell scrollbarGutter="auto">
	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
