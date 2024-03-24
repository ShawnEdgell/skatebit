<!-- src/routes/skaterxl/stats/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let statsForm: HTMLFormElement;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Skater XL Stats</title>
</svelte:head>

{#if session}
	<!-- Form to upload stats -->
	<form
		class="flex flex-col items-center space-y-5"
		method="post"
		action="?/upload"
		use:enhance={handleSubmit}
		bind:this={statsForm}
	>
		<!-- Input fields for title, description, and file upload -->
		<!-- Replace these inputs with your actual form fields -->
		<div>
			<input class="input" id="title" type="text" placeholder="Title" />
		</div>
		<div>
			<textarea class="input" id="description" placeholder="Description"></textarea>
		</div>
		<div>
			<input class="input" id="file" type="file" accept=".zip" />
		</div>

		<!-- Submit button -->
		<div>
			<input
				type="submit"
				class="button block btn variant-filled-secondary"
				value={loading ? 'Uploading...' : 'Upload Stats'}
				disabled={loading}
			/>
		</div>
	</form>
{:else}
	<!-- Display login button for non-authenticated users -->
	<div class="row flex-center flex-col items-center flex">
		<div class="col-6 form-widget">
			<a href="/login" class="button block btn variant-filled-secondary">Login</a>
		</div>
		<p>You must be logged in to upload stats & settings.</p>
	</div>
{/if}
