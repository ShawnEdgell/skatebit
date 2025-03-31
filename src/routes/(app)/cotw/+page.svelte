<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { authReady, user } from '$lib/stores/auth';
	import { submitClipPost, getUserClipThisWeek, getClipPosts } from '$lib/firebase/clips';
	import { getCurrentWeekId, getPreviousWeekId } from '$lib/utils/week';
	import { clipUpdated, alreadySubmitted } from '$lib/stores/clipUpdated';
	import type { ClipPost } from '$lib/types/clips';
	import { GoogleLoginButton, VideoItem, CountdownTimer } from '$lib/components';
	import { saveWeeklyWinner } from '$lib/firebase/hallOfFame';

	const pageTitle = 'Clip of the Week';
	const pageDescription =
		'Submit your best clip for a chance to be featured on the site for 1 week and earn a spot in the Hall of Fame!';

	let youtubeUrl = '';
	let error = '';
	let success = '';
	let checkingSubmission = true;
	let clips: ClipPost[] = [];
	let sortOption: 'latest' | 'popular' = 'latest';
	let loadingClips = false;
	let weekId = getCurrentWeekId();

	let uid = '';
	let displayName = 'Anonymous';
	let photoURL: string | undefined;

	// Fetch whether the user has a clip this week and update the global store
	async function checkSubmissionStatus() {
		checkingSubmission = true;
		if ($user) {
			uid = $user.uid;
			displayName = $user.displayName ?? 'Anonymous';
			photoURL = $user.photoURL ?? undefined;
			try {
				const existing = await getUserClipThisWeek(uid, weekId);
				alreadySubmitted.set(!!existing);
			} catch (e) {
				console.error('Error checking submission status:', e);
				alreadySubmitted.set(false);
			}
		} else {
			uid = '';
			alreadySubmitted.set(false);
		}
		checkingSubmission = false;
	}

	// Load the clips for the current week
	async function loadClips() {
		loadingClips = true;
		try {
			clips = await getClipPosts(sortOption, weekId);
		} catch (err) {
			console.error('Error loading clips:', err);
			clips = [];
		} finally {
			loadingClips = false;
		}
	}

	// Handle clip submission (note: no extra check here; the UI only shows the form if no clip exists)
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

		const postData = {
			videoId,
			source: 'user',
			uid,
			userDisplayName: displayName,
			userPhotoURL: photoURL ?? '',
			weekId,
			timestamp: new Date(),
			title: 'Untitled Clip',
			description: '',
			likes: 0,
			likedBy: []
		};

		try {
			await submitClipPost(postData);
			success = 'Clip submitted successfully!';
			youtubeUrl = '';
			await new Promise((r) => setTimeout(r, 250)); // Give Firestore time to sync
			await checkSubmissionStatus();
			await loadClips();
			clipUpdated.set(true);
		} catch (err) {
			error = 'Submission failed. Try again.';
			console.error(err);
		}
	}

	// Extract the YouTube video ID from a URL
	function extractYouTubeVideoId(url: string): string | null {
		const match = url.match(
			/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/
		);
		return match?.[1] ?? null;
	}

	// Handle countdown end and save the weekly winner
	async function handleCountdownEnd() {
		console.log('⏰ Timer ended — attempting to save weekly winner');
		weekId = getCurrentWeekId();
		await checkSubmissionStatus();
		await loadClips();
		const lastWeekId = getPreviousWeekId();
		console.log('Looking up winner for previous week:', lastWeekId);
		const winner = await saveWeeklyWinner(lastWeekId);
		console.log('🏆 Winner result:', winner);
	}

	onMount(async () => {
		if ($user) {
			await checkSubmissionStatus();
		} else {
			// If no user at mount, you might delay the check or set up a watcher
			checkingSubmission = false; // stop loading, show login prompt for now
		}
		await loadClips();
	});

	$: if ($user && $user.uid) {
		// User just logged in or became known – re-check submissions
		checkSubmissionStatus();
	}
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- The keyed wrapper forces a full remount whenever the URL changes -->
<div key={$page.url.pathname}>
	<section>
		<h1>{pageTitle} <span class="badge badge-sm lg:badge-md badge-info">Beta</span></h1>
		<p>{pageDescription}</p>
		<div class="divider mb-12"></div>
	</section>

	<!-- <CountdownTimer on:countdownEnded={handleCountdownEnd} /> -->

	<section class="not-prose">
		{#if !$authReady}
			<!-- Loading state in a card -->
			<div class="card bg-base-200 p-2">
				<div class="card-body text-center">
					<span class="loading loading-spinner loading-md"></span>
					<p class="text-base-content/80 mt-4">Checking authentication...</p>
				</div>
			</div>
		{:else if !$user}
			<!-- Login prompt in a card -->
			<div class="card bg-base-200 p-2">
				<div class="card-body space-y-4 text-center">
					<p>You must be signed in to upload a clip.</p>

					<div>
						<GoogleLoginButton />
					</div>
				</div>
			</div>
		{:else if $alreadySubmitted}
			<!-- Already submitted message in a card -->
			<div class="card bg-base-200 p-2">
				<div class="card-body text-center">
					<h2 class=" text-2xl font-bold">Clip Submitted</h2>
					<p class="text-success text-sm">You’ve already submitted a clip this week. Good luck!</p>
				</div>
			</div>
		{:else}
			<!-- Submission form card -->
			<div class="card bg-base-200 mt-6 p-2">
				<div class="card-body space-y-4">
					<h2 class="card-title text-2xl font-bold">🎬 Submit a Clip</h2>

					<ul class="text-base-content/80 list-inside list-disc space-y-1 text-sm">
						<li>1 submission allowed per week</li>
						<li>Top post gets featured for 1 week</li>
						<li>Winning clip get archived in the Hall of Fame</li>
						<li>Only YouTube links are accepted (for now)</li>
					</ul>

					<form on:submit|preventDefault={handleSubmit} class="space-y-3">
						<input
							type="text"
							bind:value={youtubeUrl}
							placeholder="Enter your YouTube URL"
							class="input input-bordered w-full"
						/>

						{#if error}
							<div class="text-error text-sm">{error}</div>
						{/if}
						{#if success}
							<div class="text-success text-sm">{success}</div>
						{/if}

						<div class="card-actions w-full justify-end">
							<button type="submit" class="btn btn-primary w-full">Submit Clip</button>
						</div>
					</form>
				</div>
			</div>
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
			<div class="space-y-6">
				{#each clips as clip}
					<div class="not-prose bg-base-200 card w-full">
						<VideoItem video={clip} />
						<a href={`/cotw/${clip.id}`} class="card hover:bg-base-200 block p-4">
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
</div>
