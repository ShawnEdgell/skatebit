<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '@supabase/supabase-js';

	interface Upload {
		id: number;
		title: string;
		description: string;
		file_path: string;
		uploaded_at: string;
	}

	let title = '';
	let description = '';
	let files: FileList | null = null;
	let loading = false;
	let uploads: Upload[] = [];

	async function uploadStats(event: SubmitEvent) {
		event.preventDefault();
		loading = true;

		if (!files || files.length === 0) {
			alert('Please select a file to upload.');
			loading = false;
			return;
		}

		const file = files[0];
		const filePath = `skater-xl-stats/${Date.now()}_${file.name}`;

		interface ExtendedUser extends User {
			user_metadata: {
				username: string;
				// Include other properties you might have in user_metadata
			};
		}

		const { data: userResponse } = await supabase.auth.getUser();
		const user = userResponse.user as ExtendedUser | null;

		const username = user?.user_metadata?.username ?? 'Anon';

		const { error: uploadError } = await supabase.storage
			.from('skater-xl-stats')
			.upload(filePath, file);
		if (uploadError) {
			console.error('Upload error:', uploadError.message);
			loading = false;
			return;
		}

		const { error } = await supabase.from('skater_xl_stats').insert({
			title,
			description,
			username, // Set username for the uploaded file
			file_path: filePath
		});

		if (error) {
			console.error('Error saving file info:', error.message);
			loading = false;
			return;
		}

		alert('File uploaded successfully.');
		loading = false;
		await fetchUploads(); // Refresh the list of uploads
	}

	async function fetchUploads() {
		const { data, error } = await supabase
			.from('skater_xl_stats')
			.select('*')
			.order('uploaded_at', { ascending: false });

		if (error) {
			console.error('Error fetching uploads:', error.message);
		} else {
			uploads = data;
		}
	}

	onMount(() => {
		fetchUploads();
	});
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div class="space-y-5">
	<h1 class="text-3xl font-bold mb-8">Stats</h1>
	<h2 class="text-xl font-semibold mb-2">Upload Your Stats & Settings</h2>
	<p class="mb-4">Upload your stats and settings for everyone to see.</p>
	<form on:submit|preventDefault={uploadStats}>
		<input class="input" type="file" multiple bind:files />
		<label class="label">
			<span>Title</span>
			<input class="input" type="text" placeholder="Title" bind:value={title} />
		</label>
		<label class="label">
			<span>Description</span>
			<textarea class="textarea" rows="4" placeholder="About your stats..." bind:value={description}
			></textarea>
		</label>
		<button type="submit" class="btn variant-filled-primary" disabled={loading}>
			{loading ? 'Uploading...' : 'Upload'}
		</button>
	</form>
	<!-- Displaying uploads -->
	<div class="mt-8 space-y-4">
		{#each uploads as upload}
			<div class="border p-4 rounded-md">
				<h3 class="text-lg font-semibold">{upload.title}</h3>
				<p>{upload.description}</p>
				<p class="text-sm">Uploaded at: {new Date(upload.uploaded_at).toLocaleString()}</p>
				<!-- Removed sveltekit:prefetch and adjusted the href -->
				<a
					href={`https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/${upload.file_path}`}
					target="_blank"
					class="btn variant-filled-secondary"
				>
					Download
				</a>
			</div>
		{/each}
	</div>
</div>
