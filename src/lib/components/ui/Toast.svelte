<script lang="ts">
	export let message: string;
	export let type: 'info' | 'success' | 'error' = 'info';
	export let visible = false;

	// Map types to classes
	$: alertClass =
		type === 'success' ? 'alert-success' : type === 'error' ? 'alert-error' : 'alert-info';
</script>

{#if visible}
	<div class="toast toast-center z-50">
		<div class={`alert ${alertClass}`}>
			<span>{message}</span>
		</div>
	</div>
{/if}
