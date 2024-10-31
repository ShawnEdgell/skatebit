<!-- src/routes/stats-settings/StatsSettings.svelte -->
<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import UploadForm from './components/UploadForm.svelte';
	import PostsList from './components/PostsList.svelte';
	import { user, login, logout } from '$lib/stores/authStore'; // Import login and logout from the store

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
	<title>Skatebit | Stats & Settings</title>
	<meta name="description" content="Get the latest stats from Milky and the community." />
</svelte:head>

<header>
	<h1>Stats & Settings</h1>
	<p>
		For help with installation, visit our
		<a href="/guides#stats-settings">Guides</a> section or ask us questions on
		<a href="https://discord.gg/359SwZ3atS" target="_blank" rel="noopener noreferrer">Discord.</a>
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
			{:else}
				<Avatar width="w-6 h-6 m-0" rounded="rounded-full" alt="Profile Picture" />
			{/if}
			<p>
				Welcome, <strong>{$user.displayName || $user.email}!</strong>
			</p>
		</div>

		<!-- Upload Button -->
		<div class="btn variant-filled-secondary gap-2 mb-4">
			<button on:click={openModal}>Upload Stats</button>
			<!-- Removed classes -->
		</div>

		<!-- Logout Button -->
		<div class="btn variant-ghost gap-2 mb-4">
			<button on:click={logout}>Logout</button>
			<!-- Added Logout button without classes -->
		</div>
	{:else}
		<div class="px-4 pb-4 text-center">
			<p>Please sign in to upload your own files.</p>
			<!-- Login Button -->
			<button class="btn variant-ghost" on:click={login}>
				<svg
					class="w-5 h-5 inline-block"
					viewBox="-0.5 0 48 48"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					fill="#000000"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<title>Google-color</title>
						<desc>Created with Sketch.</desc>
						<defs></defs>
						<g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="Color-" transform="translate(-401.000000, -860.000000)">
								<g id="Google" transform="translate(401.000000, 860.000000)">
									<path
										d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
										id="Fill-1"
										fill="#FBBC05"
									></path>
									<path
										d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
										id="Fill-2"
										fill="#EB4335"
									></path>
									<path
										d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
										id="Fill-3"
										fill="#34A853"
									></path>
									<path
										d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
										id="Fill-4"
										fill="#4285F4"
									></path>
								</g>
							</g>
						</g>
					</g>
				</svg>
				<span>Sign-in with Google </span>
			</button>
			<!-- Added Login button without classes -->
		</div>
	{/if}
</div>

<!-- Always show PostsList for all users -->
<PostsList />

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
