<script lang="ts">
	const pageTitle = 'Recent News';
	const pageDescription =
		'Discover the latest official updates, news, and videos from Skater XL, Session, Skate, and more—all in one place.';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1 class="line-through">{pageTitle}</h1>
	<p class="line-through">{pageDescription}</p>
	<div class="divider"></div>
</section>

<!-- Website Update News -->
<section>
	<h2>Website Update!</h2>
	<p class="text-sm lg:text-base">February 23, 2025</p>
	<p>
		We're making some improvements to enhance your experience. During this update, our news feed
		will be temporarily offline and a few features may be rearranged. Thank you for your patience!
	</p>
	<img src="Construction.webp" alt="Lateflip" />
</section>

<!-- Website Update News -->
<section>
	<h2>New Skater XL Mod Guide</h2>
	<p class="text-sm lg:text-base">January 16, 2025</p>
	<p>
		We're making some improvements to enhance your experience. During this update, our news feed
		will be temporarily offline and a few features may be rearranged. Thank you for your patience!
	</p>
	<div class="my-8 aspect-video w-full">
		<iframe
			load="lazy"
			src="https://www.youtube.com/embed/FAPkMnKkeOQ?si=D8FYiK5hl6VMjZLz"
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
			class="my-8 h-full w-full"
		></iframe>
	</div>
</section>
