<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let svgEl: SVGSVGElement;
	let leftPupil: SVGGElement;
	let rightPupil: SVGGElement;

	let isHovered = false;
	const duckOffset = tweened(0, {
		duration: 160,
		easing: cubicOut
	});

	// Animate up/down when hovering
	$: duckOffset.set(isHovered ? 40 : 0);

	// Mouse move = eye tracking
	function handleMouseMove(event: MouseEvent) {
		const pt = svgEl.createSVGPoint();
		pt.x = event.clientX;
		pt.y = event.clientY;

		const svgPoint = pt.matrixTransform(svgEl.getScreenCTM()?.inverse());
		updateEyes(svgPoint.x, svgPoint.y);
	}

	function updateEyes(mouseX: number, mouseY: number) {
		const eyeCenters = [
			{ eye: leftPupil, cx: 80, cy: 100 },
			{ eye: rightPupil, cx: 160, cy: 100 }
		];

		for (const { eye, cx, cy } of eyeCenters) {
			const dx = mouseX - cx;
			const dy = mouseY - cy;
			const angle = Math.atan2(dy, dx);
			const radius = 8;

			const x = radius * Math.cos(angle);
			const y = radius * Math.sin(angle);

			eye.setAttribute('transform', `translate(${x}, ${y})`);
		}
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<!-- 🐥 Mascot -->
<div class="z-10 hidden xl:block" role="presentation">
	<!-- Wrapper that defines the hover area -->
	<div
		class="h-[100px] w-[120px] transition-transform duration-250 ease-in-out"
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
		style="transform: translateY({$duckOffset}px);"
		role="presentation"
	>
		<svg bind:this={svgEl} viewBox="0 0 240 200" width="120" height="100">
			<!-- Head -->
			<circle cx="120" cy="100" r="80" class="text-base-300 fill-current" />

			<!-- Eyes -->
			<circle cx="80" cy="100" r="20" class="text-content fill-current" />
			<g bind:this={leftPupil}>
				<circle cx="80" cy="100" r="8" class="text-neutral fill-current" />
			</g>

			<circle cx="160" cy="100" r="20" class="text-content fill-current" />
			<g bind:this={rightPupil}>
				<circle cx="160" cy="100" r="8" class="text-neutral fill-current" />
			</g>
		</svg>
	</div>
</div>
