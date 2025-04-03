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
	<!-- Clickable dropdown (DaisyUI-compliant structure) -->
	<div class="dropdown dropdown-right dropdown-top">
		<!-- Trigger element -->
		<div tabindex="0" role="button" class="btn btn-ghost h-auto min-h-0 p-0">
			<slot />
		</div>

		<!-- Dropdown content -->
		<ul
			tabindex="0"
			class="dropdown-content menu bg-base-200 rounded-box z-50 w-64 space-y-3 p-4 shadow"
		>
			<!-- Avatar & Name -->
			<li class="flex items-center gap-3">
				<img src={avatar} alt={name} class="border-base-300 h-10 w-10 rounded-full border" />
				<div>
					<p class="text-sm font-bold">{name}</p>
					<p class="text-xs opacity-60">{profile?.bio ? 'User Bio' : 'No bio yet'}</p>
				</div>
			</li>

			<!-- Bio -->
			{#if profile?.bio}
				<li class="text-sm">{profile.bio}</li>
			{/if}

			<!-- Links -->
			{#if hasProfileContent}
				<li class="flex flex-wrap gap-2">
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
				</li>
			{/if}

			<!-- Empty profile state -->
			{#if profile && !hasProfileContent}
				<li class="text-base-300 text-xs italic">This user has not set up a profile yet.</li>
			{/if}
		</ul>
	</div>
{:else}
	<!-- Hover mode -->
	<div class="tooltip tooltip-right" data-tip={profile?.bio || name}>
		<slot />
	</div>
{/if}
