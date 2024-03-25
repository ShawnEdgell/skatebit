<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: {
		session: any; // Consider adding actual types
		supabase: any; // Consider adding actual types
		countries: { id: number; name: string }[]; // Adjusted to include id
	};

	let { session, supabase, countries } = data;
	let countryForm: HTMLFormElement;
	let loading = false;
	let name: string = '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			// Assume form submission logic to Supabase goes here

			loading = false;
			name = ''; // Reset the name field after successful submission
		};
	};

	const reloadCountries = async () => {
		const { data: newData, error } = await supabase.from('xl_stats').select('id, name');

		if (error) {
			console.error('Error fetching data:', error.message);
		} else {
			countries = newData ?? [];
		}
	};

	onMount(async () => {
		await reloadCountries();
	});
</script>

<svelte:head>
	<title>Skatebit | Stats</title>
</svelte:head>

<div class="flex flex-col items-center space-y-5">
	<form
		class="flex flex-col items-center space-y-5"
		method="post"
		action="?/addCountry"
		use:enhance={handleSubmit}
		bind:this={countryForm}
	>
		<div>
			<input
				class="input"
				id="name"
				name="name"
				type="text"
				placeholder="Country Name"
				bind:value={name}
			/>
		</div>

		<div>
			<input
				type="submit"
				class="button block btn variant-filled-secondary"
				value={loading ? 'Adding...' : 'Add Country'}
				disabled={loading}
			/>
		</div>
	</form>
	<button class="button btn variant-filled" on:click={reloadCountries}>Reload List</button>
	<div>
		<h2>List of Countries</h2>
		<ul>
			{#each countries as country}
				<li>{country.name}</li>
			{/each}
		</ul>
	</div>
</div>
