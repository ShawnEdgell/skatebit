<script lang="ts">
	import CountdownTimerSmall from '../ui/CountdownTimerSmall.svelte';
</script>

<!-- Desktop Alert Bar -->
<div class="bg-primary w-full px-6">
	<div class="navbar mx-auto w-full max-w-5xl justify-center md:justify-between">
		<p class="hidden text-sm md:block">
			Check out the new <strong>Clip of the Week</strong> page!
		</p>
		<div class="flex items-center gap-4">
			<CountdownTimerSmall size="text-lg" />
			<a href="/cotw" class="btn">Clip of the Week</a>
		</div>
	</div>
</div>
