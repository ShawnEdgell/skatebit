<script lang="ts">
	import { onDestroy } from 'svelte'; // Import onDestroy for cleanup

	export let isVisible: boolean = false;
	export let message: string = '';
	export let type: 'success' | 'error' = 'success';
	export let autoHide: boolean = true;
	export let duration: number = 3000; // Default duration for auto-hide (3 seconds)

	// Hide the toast after the specified duration if autoHide is enabled
	$: if (isVisible && autoHide) {
		const timeout = setTimeout(() => {
			isVisible = false;
		}, duration);

		// Clear the timeout if component is destroyed early
		onDestroy(() => clearTimeout(timeout));
	}
</script>

{#if isVisible}
	<div class="toast toast-center">
		<div class="alert alert-{type}">
			<span>{message}</span>
		</div>
	</div>
{/if}
