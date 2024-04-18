<!-- src/routes/flipper/+page.svelte -->
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
	<form on:submit={handleSubmit} class="flex p-4 gap-2">
		<input class="input" type="file" name="file" accept=".xml" required />
		<button class="btn variant-filled-primary" type="submit">Upload and Flip XML</button>
	</form>
</article>
