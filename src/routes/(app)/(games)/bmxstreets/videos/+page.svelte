<script lang="ts">
	import { onMount } from 'svelte';
	import { tocCrawler } from '@skeletonlabs/skeleton';

	interface Reaction {
		type: string;
		profile_id: string;
	}

	interface Submission {
		id: number;
		title: string;
		created_at: string;
		youtube_link: string;
		profile_id: string;
		profiles?: Profile;
		reaction_count: number;
		hasReacted?: boolean;
		streets_reactions?: Reaction[]; // Ensure this is defined if you use it in your Submission interface
	}

	interface Profile {
		username: string;
	}

	export let data: {
		session: any;
		supabase: any;
		submissions: Submission[];
	};

	let { session, supabase, submissions } = data;
	let loading = false;
	let title: string = '';
	let youtube_link: string = '';
	let isFormValid: boolean = false;
	let form: HTMLFormElement;

	function convertToEmbedUrl(url: string): string {
		if (!url) return '';
		const urlObj = new URL(url);
		const videoId = urlObj.searchParams.get('v');
		return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
	}

	const handleSubmit = async () => {
		loading = true;
		try {
			const { data: newSubmission, error } = await supabase
				.from('streets_edits')
				.insert({ title, youtube_link, profile_id: session.user.id });

			if (error) {
				console.error('Error adding submission:', error.message);
			} else {
				title = '';
				youtube_link = '';
				await reloadSubmissions();
			}
		} finally {
			loading = false;
		}
	};

	async function handleReaction(submissionId: number) {
		const submission = submissions.find((s) => s.id === submissionId);
		if (!submission) return;

		if (submission.hasReacted) {
			const { error } = await supabase
				.from('streets_reactions')
				.delete()
				.match({ submission_id: submissionId, profile_id: session.user.id, type: 'fire' });

			if (!error) {
				submission.reaction_count--; // Decrement reaction count
				submission.hasReacted = false; // Set hasReacted to false
			} else {
				console.error('Error removing reaction:', error.message);
			}
		} else {
			const { error } = await supabase.from('streets_reactions').insert({
				submission_id: submissionId,
				profile_id: session.user.id,
				type: 'fire'
			});

			if (!error) {
				submission.reaction_count++; // Increment reaction count
				submission.hasReacted = true; // Set hasReacted to true
			} else {
				console.error('Error adding reaction:', error.message);
			}
		}

		// Force Svelte to update the component by reassigning the submissions array
		submissions = submissions.slice();
	}

	const confirmDelete = async (submission: Submission) => {
		console.log('Deleting submission:', submission);
		if (window.confirm('Are you sure you want to delete this submission?')) {
			await deleteSubmission(submission);
		}
	};

	async function reloadSubmissions() {
		const { data: newSubmissions, error } = await supabase
			.from('streets_edits') // Remove the generic type argument here
			.select(
				'id, title, created_at, youtube_link, profile_id, profiles(username), streets_reactions(type, profile_id)'
			)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}

		// Assume newSubmissions is correctly fetched and cast it to the expected type manually
		submissions = (newSubmissions as Submission[]).map((submission) => {
			// Handle the possibility that streets_reactions might be undefined
			const hasReacted =
				submission.streets_reactions?.some(
					(reaction) => reaction.profile_id === session.user.id && reaction.type === 'fire'
				) ?? false;
			const reaction_count = submission.streets_reactions?.length ?? 0;
			return { ...submission, hasReacted, reaction_count };
		});
	}

	const editSubmission = async (submission: Submission) => {
		try {
			const newTitle = prompt('Enter new title:', submission.title);
			const newYoutubeLink = prompt('Enter new YouTube link:', submission.youtube_link);

			if (newTitle === null || newYoutubeLink === null) {
				// User canceled editing
				console.log('Editing canceled by user.');
				return;
			}

			const { error } = await supabase
				.from('streets_edits')
				.update({
					title: newTitle,
					youtube_link: newYoutubeLink
				})
				.eq('id', submission.id);

			if (error) {
				console.error('Error editing submission:', error.message);
				throw new Error('Failed to edit submission');
			}

			// Update the submission in the list
			const updatedSubmissions = submissions.map((s) => {
				if (s.id === submission.id) {
					return { ...s, title: newTitle, youtube_link: newYoutubeLink };
				}
				return s;
			});
			submissions = updatedSubmissions;
			console.log('Submission edited successfully:', submission.id);
		} catch (error) {
			console.error('Failed to edit submission:', error instanceof Error ? error.message : error);
		}
	};

	async function deleteSubmission(submission: Submission) {
		console.log('Deleting submission:', submission);

		// Start by deleting all reactions associated with the submission
		const { error: reactionError } = await supabase
			.from('streets_reactions')
			.delete()
			.match({ submission_id: submission.id });

		if (reactionError) {
			console.error('Error deleting reactions:', reactionError.message);
			return; // Stop further processing if reactions cannot be deleted
		}

		// Proceed to delete the submission if reactions were successfully deleted
		const { error: submissionError } = await supabase
			.from('streets_edits')
			.delete()
			.eq('id', submission.id);

		if (submissionError) {
			console.error('Error deleting submission:', submissionError.message);
		} else {
			console.log('Submission deleted successfully:', submission.id);
			// Update the submissions array to remove the deleted submission
			submissions = submissions.filter((s) => s.id !== submission.id);
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		// Convert the date to the user's local time zone
		const formatted = new Intl.DateTimeFormat('default', {
			dateStyle: 'medium',
			timeStyle: 'short',
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
		}).format(date);
		return formatted;
	}

	onMount(async () => {
		await reloadSubmissions();
	});

	$: isFormValid = !!title.trim().length && !!youtube_link.trim().length;
</script>

<svelte:head>
	<title>Skatebit | BMX Streets</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">BMX Streets</span>
			<h1>Video Submissions</h1>
			<p>Welcome to the Submission Page!</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			{#if session}
				<form
					class="flex flex-col space-y-5"
					on:submit|preventDefault={handleSubmit}
					bind:this={form}
				>
					<h2>Submit a New Video</h2>
					<p>
						Feel free to link your BMX Streets edits below. Please use youtube links only. Stay
						tuned for more features!
					</p>
					<div class="w-full">
						<input
							class="input"
							id="submission-title"
							name="title"
							type="text"
							placeholder="Video Title"
							bind:value={title}
						/>
					</div>
					<div class="w-full">
						<input
							class="input"
							id="submission-url"
							name="youtubeLink"
							type="text"
							placeholder="YouTube Video URL"
							bind:value={youtube_link}
						/>
					</div>
					<div class="w-full flex justify-center">
						<input
							type="submit"
							class="button block btn variant-filled-secondary"
							value={loading ? 'Submitting...' : 'Submit'}
							disabled={!isFormValid || loading}
						/>
					</div>
				</form>
			{:else}
				<div class="flex justify-center">
					<a href="/login" class="button btn variant-filled" data-sveltekit-preload-data="hover"
						>Login to Submit</a
					>
				</div>
			{/if}
		</div>
		<div>
			<h2>Submissions</h2>
			<ul class="space-y-6 w-full">
				{#each submissions as submission (submission.id)}
					<div class="flex flex-col card p-6 justify-between items-start gap-6">
						<div class="flex w-full flex-col space-y-4">
							<h3 class="h3" data-toc-ignore>{submission.title}</h3>
							<iframe
								src={convertToEmbedUrl(submission.youtube_link)}
								loading="lazy"
								title={`YouTube video titled ${submission.title}`}
								frameborder="0"
								allowfullscreen
							>
							</iframe>
						</div>
						<div class="flex w-full justify-between items-center">
							<div>
								<p class="text-sm mt-2">
									Uploaded by: <span class="font-medium">{submission.profiles?.username}</span>
								</p>
								{#if submission.created_at}
									<p class="text-sm">
										Created: <span class="font-medium">{formatDate(submission.created_at)}</span>
									</p>
								{/if}
							</div>
							<div class="flex items-center">
								<button
									class="btn variant-filled-surface {submission.hasReacted
										? 'btn-liked'
										: 'btn-unliked'} ml-4"
									on:click={() => handleReaction(submission.id)}
									disabled={!session || !session.user}
								>
									🔥 {submission.reaction_count}
								</button>
							</div>
						</div>
						{#if session && session.user.id === submission.profile_id}
							<div class="grid grid-cols-2 gap-2">
								<button
									class="btn btn-sm variant-filled-warning"
									on:click={() => editSubmission(submission)}>Edit</button
								>
								<button
									class="btn btn-sm variant-filled-error"
									on:click={() => confirmDelete(submission)}>Delete</button
								>
							</div>
						{/if}
					</div>
				{/each}
			</ul>
		</div>
	</article>
</div>
