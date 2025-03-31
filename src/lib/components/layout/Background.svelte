<!-- Background.svelte -->
<div class="absolute inset-0 -z-10 overflow-hidden opacity-35">
	<div
		class="bg-primary animate-pulse-blur absolute top-0 left-1/3 h-96 w-96 rounded-full mix-blend-overlay blur-[100px] delay-[0s]"
	></div>

	<div
		class="bg-secondary animate-pulse-blur absolute right-1/4 bottom-0 h-[28rem] w-[28rem] rounded-full mix-blend-overlay blur-[120px] delay-[2s]"
	></div>
	<div
		class="bg-accent animate-pulse-blur absolute top-1/2 left-1/4 h-[32rem] w-[32rem] rounded-full mix-blend-overlay blur-[130px] delay-[4s]"
	></div>
</div>

<style>
	@keyframes pulse-blur {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.25;
		}
		50% {
			transform: scale(1.4);
			opacity: 0.4;
		}
	}

	.animate-pulse-blur {
		animation: pulse-blur 12s ease-in-out infinite;
	}
</style>
