<script lang="ts">
	import CountdownTimerSmall from '../ui/CountdownTimerSmall.svelte';
</script>

<!-- Desktop Navbar -->
<div class="navbar bg-primary flex justify-center px-4 md:justify-between">
	<p class="hidden pl-2 text-sm md:block">
		Check out the new
		<strong>Clip of the Week</strong>
		page!
	</p>
	<div class="flex items-center gap-4">
		<CountdownTimerSmall size="text-lg" />
		<a href="/cotw" class="btn">Clip of the Week</a>
	</div>
</div>
