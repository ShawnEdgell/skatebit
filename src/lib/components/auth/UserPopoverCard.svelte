<script lang="ts">
	import { onMount } from 'svelte';
	import { getUserProfile } from '$lib/firebase/users';
	import type { UserProfile } from '$lib/types/users';

	export let userId: string;
	export let name: string = 'Unknown User';
	export let avatar: string = 'https://via.placeholder.com/40';
	export let placement: 'hover' | 'click' = 'hover';

	const profileCache = new Map<string, UserProfile | null>();

	let profile: UserProfile | null = null;

	// Determine if the user has *any* profile content
	$: hasProfileContent =
		!!profile?.bio ||
		!!profile?.links?.youtube ||
		!!profile?.links?.instagram ||
		!!profile?.links?.discord ||
		!!profile?.links?.tiktok;

	onMount(async () => {
		if (!userId) return;

		if (profileCache.has(userId)) {
			profile = profileCache.get(userId) ?? null;
			return;
		}

		const fetched = await getUserProfile(userId);
		profileCache.set(userId, fetched ?? null);
		profile = fetched ?? null;
	});
</script>

{#if placement === 'click'}
	<div class="dropdown dropdown-right dropdown-top">
		<div role="button" tabindex="0">
			<slot />
		</div>

		<div
			role="tooltip"
			class="dropdown-content card card-bordered bg-base-200 z-50 w-64 p-4 shadow"
		>
			<!-- Top: Avatar & Name -->
			<div class="flex items-center gap-3">
				<img src={avatar} alt={name} class="border-base-300 h-10 w-10 rounded-full border" />
				<div>
					<p class="text-sm font-bold">{name}</p>
					<p class="text-xs opacity-60">{profile?.bio ? 'User Bio' : 'No bio yet'}</p>
				</div>
			</div>

			<!-- Bio -->
			{#if profile?.bio}
				<p class="mt-3 text-sm">{profile.bio}</p>
			{/if}

			<!-- Links -->
			{#if hasProfileContent}
				<div class="mt-3 flex flex-wrap gap-2">
					{#if profile?.links?.youtube}
						<a href={profile.links.youtube} target="_blank" class="badge badge-error">YouTube</a>
					{/if}
					{#if profile?.links?.instagram}
						<a href={profile.links.instagram} target="_blank" class="badge badge-secondary"
							>Instagram</a
						>
					{/if}
					{#if profile?.links?.discord}
						<a href={profile.links.discord} target="_blank" class="badge badge-primary">Discord</a>
					{/if}
					{#if profile?.links?.tiktok}
						<a href={profile.links.tiktok} target="_blank" class="badge badge-neutral">TikTok</a>
					{/if}
				</div>
			{/if}

			<!-- Empty state -->
			{#if profile && !hasProfileContent}
				<p class="text-base-300 mt-2 text-xs italic">This user has not set up a profile yet.</p>
			{/if}
		</div>
	</div>
{:else}
	<!-- Hover mode -->
	<div class="tooltip tooltip-right" data-tip={profile?.bio || name}>
		<slot />
	</div>
{/if}
