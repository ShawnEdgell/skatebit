<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Avatar from './Avatar.svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="container-centered">
	<form
		class="flex flex-col items-center space-y-5"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<Avatar
			{supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>
		<div>
			<input class="input" id="email" type="text" value={session.user.email} disabled />
		</div>

		<div>
			<input
				class="input"
				id="fullName"
				name="fullName"
				type="text"
				placeholder="Full Name"
				value={form?.fullName ?? fullName}
			/>
		</div>

		<div>
			<input
				class="input"
				id="username"
				name="username"
				type="text"
				placeholder="Username"
				value={form?.username ?? username}
			/>
		</div>

		<div>
			<input
				class="input"
				id="website"
				name="website"
				type="url"
				autocomplete="email"
				placeholder="Website"
				value={form?.website ?? website}
			/>
		</div>

		<div>
			<input
				type="submit"
				class="button block btn variant-filled-secondary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block btn variant-filled-error" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
