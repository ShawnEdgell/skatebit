<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let size = 10;
	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		uploading = true;

		try {
			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const newFilePath = `${Math.random()}.${fileExt}`;

			// Delete existing avatar from storage if 'url' is not empty
			if (url) {
				// Assuming 'url' contains the filename of the existing avatar
				// Extract filename from 'url' if it's structured differently
				const { error: deleteError } = await supabase.storage.from('avatars').remove([url]);
				if (deleteError) {
					throw deleteError;
				}
			}

			// Upload the new file
			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(newFilePath, file);
			if (uploadError) {
				throw uploadError;
			}

			// Update the avatar URL to the new file path
			url = newFilePath;
			avatarUrl = null; // Reset this to force re-download if necessary

			// Emit an event to notify of the upload completion, for example, to update the user profile
			dispatch('upload', { newUrl: newFilePath });
		} catch (error) {
			if (error instanceof Error) {
				console.error('Upload error:', error.message);
				alert(error.message); // Display a user-friendly error message
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div class="space-y-3">
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt={avatarUrl ? 'Avatar' : 'No image'}
			class="avatar image"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />

	<div style="width: {size}em;">
		<label class="button block btn variant-filled" for="single">
			{uploading ? 'Uploading ...' : 'Change avatar'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>
