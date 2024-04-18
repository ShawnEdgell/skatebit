<!-- src/routes/(app)/(games)/skaterxl/flipper/+page.svelte -->
<script lang="ts">
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);

		// Perform the fetch request to the server
		const response = await fetch('/api/flipper', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			const blob = await response.blob();
			const downloadUrl = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = downloadUrl;
			a.download = 'flipped.xml';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(downloadUrl);

			// Clear the form after successful upload
			target.reset();
		} else {
			console.error('Failed to process the file');
			alert('There was an error processing your file. Please try again.');
		}
	}
</script>

<article>
	<div class="header">
		<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
		<h1>Stance Flipper (Beta)</h1>
		<p>Easily swap XXL Mod presets between goofy and regular!</p>
		<hr class="!border-t-2" />
	</div>
	<aside class="alert variant-ghost-error mb-6">
		<!-- Icon -->
		<div>
			<svg class="w-12 h-12" viewBox="0 0 24 24" fill="none">
				<path
					d="M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3">Upload Info</h3>
			<p>
				Note that this tool is still in beta and may not work as expected . If you encounter any
				issues, please let us know in the Forums or on Disord! Make sure to only upload XML files
				exported from XXL Mod.
			</p>
		</div>
	</aside>
	<div>
		<h2>Stance Flipper</h2>
		<p>
			Upload your XXL Mod stance file. Our tool will automatically swap the statistics for your left
			and right feet and provide you with a download link for your flipped stats.
		</p>

		<form on:submit={handleSubmit} class="flex gap-2">
			<input class="input" type="file" name="file" accept=".xml" required />
			<button class="btn variant-filled-primary" type="submit">Upload and Flip XML</button>
		</form>
	</div>
</article>
