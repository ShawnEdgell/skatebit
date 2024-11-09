<!-- src/components/LoginAvatar.svelte -->
<script lang="ts">
	import { user } from '$lib/stores/authStore';
</script>

{#if $user?.photoURL}
	<img src={$user.photoURL} class="w-6 h-6 rounded-full" alt="Profile" />
{:else}
	<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
		<path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
	</svg>
{/if}
