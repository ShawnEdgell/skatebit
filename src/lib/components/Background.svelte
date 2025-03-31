<!-- Background.svelte -->

<div class=" absolute inset-0 -z-10 overflow-hidden">
	<!-- Glow 2: Secondary -->
	<div
		class="bg-primary animate-pulse-blur absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full mix-blend-overlay blur-[120px] delay-[2s]"
	></div>

	<!-- Glow 3: Accent -->
	<div
		class="bg-primary animate-pulse-blur absolute top-1/2 left-0 hidden h-[32rem] w-[32rem] rounded-full mix-blend-overlay blur-[130px] delay-[4s] md:block"
	></div>
</div>

<style>
	@keyframes pulse-blur {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.15;
		}
		50% {
			transform: scale(1.4);
			opacity: 0.2;
		}
	}

	.animate-pulse-blur {
		animation: pulse-blur 12s ease-in-out infinite;
	}
</style>
