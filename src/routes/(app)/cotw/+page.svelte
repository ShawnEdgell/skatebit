<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import { onMount, onDestroy } from 'svelte';
	import { user } from '$lib/stores/auth';
	import { submitClipPost, getUserClipThisWeek, getClipPosts } from '$lib/firebase/clips';
	import { getCurrentWeekId, getEndOfCurrentWeek } from '$lib/utils/week';
	import type { ClipPost } from '$lib/types/clips';

	import GoogleLoginButton from '$lib/components/GoogleLoginButton.svelte';
	import VideoItem from '$lib/components/VideoItem.svelte';

	const pageTitle = 'Clip of the Week';
	const pageDescription =
		'Submit your best clip for a chance to be featured on the site for 1 week and earn a spot in the Hall of Fame!';

	let youtubeUrl = '';
	let error = '';
	let success = '';
	let alreadySubmitted = false;
	let checkingSubmission = true;
	let clips: ClipPost[] = [];
	let sortOption: 'latest' | 'popular' = 'latest';
	let hasMounted = false;
	let loadingClips = false;

	const weekId = getCurrentWeekId();

	let uid = '';
	let displayName = 'Anonymous';
	let photoURL: string | undefined;

	let countdown = '';
	let interval: ReturnType<typeof setInterval>;

	function updateCountdown() {
		const now = new Date();
		const endOfWeek = getEndOfCurrentWeek(); // returns a Date
		const diff = endOfWeek.getTime() - now.getTime();

		if (diff <= 0) {
			clearInterval(interval);
			countdown = 'Submissions closed';
			return;
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}

	// Reactive user data
	$: if ($user) {
		uid = $user.uid;
		displayName = $user.displayName ?? 'Anonymous';
		photoURL = $user.photoURL ?? undefined;

		checkingSubmission = true;
		getUserClipThisWeek(uid, weekId).then((existing) => {
			alreadySubmitted = !!existing;
			checkingSubmission = false;
		});
	} else {
		uid = '';
		alreadySubmitted = false;
		checkingSubmission = false;
	}

	$: if (sortOption && hasMounted) {
		loadClips();
	}

	onMount(() => {
		hasMounted = true;
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
		loadClips();
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	async function loadClips() {
		loadingClips = true;
		try {
			clips = await getClipPosts(sortOption);
		} catch (err) {
			console.error('Error loading clips:', err);
			clips = [];
		} finally {
			loadingClips = false;
		}
	}

	async function handleSubmit() {
		error = '';
		success = '';

		if (!youtubeUrl.trim()) {
			error = 'YouTube URL is required.';
			return;
		}

		const videoId = extractYouTubeVideoId(youtubeUrl.trim());
		if (!videoId) {
			error = 'Invalid YouTube URL.';
			return;
		}

		try {
			await submitClipPost({
				videoId,
				source: 'user',
				uid,
				userDisplayName: displayName,
				userPhotoURL: photoURL,
				weekId
			});

			success = 'Clip submitted successfully!';
			youtubeUrl = '';
			alreadySubmitted = true;
			await loadClips();
		} catch (err) {
			error = 'Submission failed. Try again.';
			console.error(err);
		}
	}

	function extractYouTubeVideoId(url: string): string | null {
		const match = url.match(
			/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/
		);
		return match?.[1] ?? null;
	}
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<section>
	<h1>{pageTitle} <span class="badge badge-sm lg:badge-md badge-info">Beta</span></h1>
	<p>{pageDescription}</p>
	<p class="text-primary font-semibold">⏳ {countdown}</p>
	<ul class="list-disc text-sm">
		<li>1 submission allowed per week</li>
		<li>Top post gets featured for 1 week</li>
		<li>Winning clips will be archived in the Hall of Fame</li>
		<li>Only YouTube links are accepted</li>
	</ul>
	<div class="divider"></div>
</section>

<section>
	{#if checkingSubmission}
		<p>Checking submission status...</p>
	{:else if !$user}
		<p class="mb-4">Please log in to submit a clip.</p>
		<GoogleLoginButton />
	{:else if alreadySubmitted}
		<h2>Submit</h2>
		<p class="text-success">You've already submitted a clip for this week.</p>
	{:else}
		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<h2>Submit</h2>
			<input
				type="text"
				bind:value={youtubeUrl}
				placeholder="YouTube URL"
				class="input input-bordered w-full"
			/>
			{#if error}
				<p class="text-error">{error}</p>
			{/if}
			{#if success}
				<p class="text-success">{success}</p>
			{/if}
			<button type="submit" class="btn btn-primary">Submit Clip</button>
		</form>
	{/if}
</section>

<section>
	<h2 class="flex flex-wrap items-center justify-between gap-2">
		<span>This Week's Clips</span>
		{#if clips.length > 0}
			<select bind:value={sortOption} on:change={loadClips} class="select select-sm w-28">
				<option value="latest">Newest</option>
				<option value="popular">Popular</option>
			</select>
		{/if}
	</h2>

	{#if loadingClips}
		<p class="mt-4 text-sm opacity-50">Loading clips...</p>
	{:else if clips.length > 0}
		<div class="space-y-8">
			{#each clips as clip}
				<div class="not-prose bg-base-200 card w-full">
					<VideoItem video={clip} />

					<a href={`/cotw/${clip.id}`} class="card hover:bg-base-300 block p-4">
						<div class="flex items-center justify-between text-sm">
							<div class="flex items-center gap-3">
								<img
									src={clip.userPhotoURL || 'https://via.placeholder.com/40'}
									alt={clip.userDisplayName}
									class="h-8 w-8 rounded-full"
								/>
								<div>
									<p class="font-semibold">{clip.userDisplayName}</p>
									<p class="text-xs opacity-50">Uploaded on {formatDate(clip.timestamp)}</p>
								</div>
							</div>
							<div class="flex items-center gap-4 text-sm">
								{#if clip.likes > 0}
									<span class="text-success">❤️ {clip.likes}</span>
								{/if}
								<span class="opacity-50">💬 {clip.commentsCount ?? 0}</span>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-sm opacity-50">No clips yet. Be the first to submit!</p>
	{/if}
</section>
