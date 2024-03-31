<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<svelte:head>
	<title>Skatebit | Login</title>
</svelte:head>

<div class="flex h-full justify-center flex-col items-center p-4">
	<div class=" max-w-sm space-y-5">
		<h1 class="h1">Account Login</h1>
		<p>Access and edit your own profile, upload stats/settings, and more!</p>
		<Auth
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${data.url}/auth/callback`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
			providers={['google', 'discord']}
		/>
	</div>
</div>
