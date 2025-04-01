<script lang="ts">
	import CountdownTimerSmall from '../ui/CountdownTimerSmall.svelte';
</script>

<div class="my-2 flex w-full justify-center px-4">
	<a
		href="/cotw"
		class="btn btn-xs btn-soft flex w-full max-w-md items-center gap-2 rounded-full p-4 text-sm"
	>
		<p class="text-center">🎬 Clip of the Week</p>
		<CountdownTimerSmall />
	</a>
</div>
