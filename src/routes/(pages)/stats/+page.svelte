<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Badge from '../../../components/Badge.svelte';
	import UploadForm from './components/UploadForm.svelte';
	import LoginPrompt from './components/LoginPrompt.svelte';
	import PostsList from './components/PostsList.svelte';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/stores/authStore';

	let isAuthLoading = false;
	let showModal = false;

	const logout = async () => {
		isAuthLoading = true;
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Error signing out:', error);
		} finally {
			isAuthLoading = false;
		}
	};

	let postsListRef: { fetchPosts: () => Promise<void> } | null = null;

	const handleUploadSuccess = () => {
		if (postsListRef) {
			postsListRef.fetchPosts();
		}
		closeModal(); // Close the modal
	};

	const openModal = () => {
		showModal = true;
	};

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
	<title>Skatebit | Stats & Settings</title>
	<meta name="description" content="Get the latest stats from Milky and the community." />
</svelte:head>

<header>
	<Badge />
	<h1>Stats & Settings</h1>
	<p>
		For help with installation, visit our
		<a href="/guides">Guides</a> section or ask us questions on
		<a href="https://discord.gg/359SwZ3atS" target="_blank">Discord.</a>
	</p>

	<hr />
</header>

<div class="card flex flex-col items-center p-4">
	{#if $user}
		<div class="flex items-center gap-2 not-prose p-4">
			{#if $user.photoURL}
				<Avatar
					src={$user.photoURL}
					width="w-6 h-6 m-0"
					rounded="rounded-full"
					alt="Profile Picture"
				/>
			{/if}
			<p>
				Welcome,&nbsp<strong>{$user.displayName || $user.email}!</strong>
			</p>
		</div>

		<div class="gap-2 mb-4">
			<button class="btn variant-filled-secondary" on:click={openModal}>Upload Stats</button>
			<button class="btn variant-ghost" on:click={logout} disabled={isAuthLoading}>
				{isAuthLoading ? 'Logging out...' : 'Logout'}
			</button>
		</div>
	{:else}
		<LoginPrompt />
	{/if}
</div>

<PostsList bind:this={postsListRef} />

<!-- Modal -->
{#if showModal}
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
