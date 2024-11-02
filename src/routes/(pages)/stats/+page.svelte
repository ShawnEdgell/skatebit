<script lang="ts">
	import { pageHeader, Help } from '$lib';
	import { UploadForm, PostList } from '$lib';
	import { user, login, logout } from '$lib/stores/authStore'; // Import login and logout from the store

	const { title, description, heading } = pageHeader.stats;

	let showModal = false;

	// Function to handle successful uploads
	const handleUploadSuccess = () => {
		// Logic to handle successful upload, e.g., refreshing posts
		closeModal(); // Close the modal after successful upload
	};

	// Function to open the upload modal
	const openModal = () => {
		showModal = true;
	};

	// Function to close the upload modal
	const closeModal = () => {
		showModal = false;
	};

	// Custom action to detect clicks outside the modal content
	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (!node.contains(event.target as Node)) {
				closeModal();
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<section>
	<h1>{heading}</h1>
	<p>{description}</p>
	<Help />
	<hr />
</section>

<div class="flex flex-col items-center">
	{#if $user}
		<div class="flex items-center gap-2">
			<p>
				Welcome, <strong>{$user.displayName || $user.email}!</strong>
			</p>
		</div>

		<div>
			<!-- Upload Button -->
			<div class="btn">
				<button on:click={openModal}>Upload Stats</button>
				<!-- Removed classes -->
			</div>
		</div>
	{:else}
		<div class="text-center">
			<p>Please sign in to upload your own files.</p>
		</div>
	{/if}
</div>

<!-- Always show PostList for all users -->
<PostList />

<!-- Modal for Uploading Stats (only for authenticated users) -->
{#if showModal && $user}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div
			class="card p-8 relative max-w-md w-full"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			use:clickOutside
		>
			<h2 id="modal-title" class="text-xl font-bold mb-4">Upload Stats</h2>
			<p class="mt-2 text-base">
				Please make sure to only upload <strong>.ZIP</strong> files.
			</p>
			<button
				class="absolute top-4 right-4 text-2xl font-bold"
				on:click={closeModal}
				aria-label="Close modal"
			>
				&times;
			</button>
			<UploadForm on:uploadSuccess={handleUploadSuccess} on:cancel={closeModal} />
		</div>
	</div>
{/if}
