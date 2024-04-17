<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | BMX Streets</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-surface mb-2">BMX Streets</span>
			<h1>ReShade</h1>
			<p>Advanced post-processing for BMX Streets.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Download ReShade</h2>
			<p>
				The button below will link you to the official Reshade website where you can download the
				latest version of Reshade.
			</p>
			<a href="https://reshade.me/" target="_blank" class="btn variant-filled-secondary"
				>reshade.me</a
			>
		</div>
		<div>
			<h2>Installing ReShade</h2>
			<p>
				Installing Reshade is a simple process. After downloading the Reshade installer, run the
				file and follow the on-screen instructions. When prompted to select BMX Streets as your
				game, and choose DirectX 10/11/12. Once the installation is complete, you can launch BMX
				Streets and press the Home key to open the Reshade menu. From there, you can select and
				apply various graphical enhancements and filters to customize your game's visuals.
			</p>
		</div>
		<div>
			<h2>What's ReShade?</h2>
			<p>
				Reshade is a powerful post-processing tool that enhances and optimizes the visuals of games.
				For BMX Streets, Reshade can significantly improve the game's color depth, contrast, and
				overall visual appeal. It allows you to apply a range of graphical enhancements and filters
				that can transform the game's aesthetic, making it more vibrant and immersive. Below, you
				can see comparison images that show BMX Streets with and without Reshade, illustrating the
				dramatic improvements it can offer.
			</p>
		</div>
		<div>
			<h3 class="h3">Without Reshade</h3>
			<img src="/images/BMX_Reshade1.webp" alt="Without Reshade Example" class="my-4" />
		</div>
		<div>
			<h3 class="h3">Reshade Enhanced</h3>
			<p>
				Please note that you can adjust and create your own custom settings. This is just an
				example.
			</p>
			<img src="/images/BMX_Reshade2.webp" alt="Without Reshade Example" class="my-4" />
		</div>
		<div>
			<h3 class="h3">Settings Example</h3>
			<p>
				The ReShade enhanced image uses FakeHDR and prod80 Color Tempurature filters. This helps
				reduce the brown 'hazy' look of the base map.
			</p>
			<img src="/images/BMX_Reshade3.webp" alt="Without Reshade Example" class="my-4" />
		</div>
	</article>
</div>
