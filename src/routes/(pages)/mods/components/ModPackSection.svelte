<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<section>
	<h2>Mod Packs</h2>
	<p>
		"Mod Packs" allows users to download the complete set of mods for their chosen game version with
		a single click, making it easy to get all the necessary mods at once.
	</p>
	<h3>Additional Notes</h3>
	<ul>
		<li>
			These packs don't include any
			<a href="/stats" data-sveltekit-preload-data="hover">stats & settings</a>; you will need to
			install or set these up on your own.
		</li>
		<li>
			Soundmod v1.2.0 for v1.2.10.4 does not include a
			<a
				href="https://mod.io/g/skaterxl/m/ovalord-vx-soundmod"
				data-sveltekit-preload-data="hover"
				target="_blank"
			>
				soundpack
			</a>. You will need to download and install one on your own.
		</li>
	</ul>

	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="lead"></svelte:fragment>
			<svelte:fragment slot="summary"><strong>Skater XL v1.2.2.8 (Alpha)</strong></svelte:fragment>
			<svelte:fragment slot="content">
				<a
					class="btn mt-2 variant-filled-secondary no-underline"
					href="https://firebasestorage.googleapis.com/v0/b/stillmilkylive.appspot.com/o/XL%20Alpha%20(1.2.2.8)%20Mod%20Starter%20Pack.zip?alt=media&token=b61391d0-b0b7-4ad3-be73-712dd709c30c"
				>
					Download v1.2.2.8 Mod Pack
				</a></svelte:fragment
			>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"></svelte:fragment>
			<svelte:fragment slot="summary"><strong>Skater XL v1.2.10.4 (Public)</strong></svelte:fragment
			>
			<svelte:fragment slot="content">
				<a
					class="btn mt-2 variant-filled-secondary no-underline"
					href="https://firebasestorage.googleapis.com/v0/b/stillmilkylive.appspot.com/o/XL%20Public%20(1.2.10.4)%20Mod%20Starter%20Pack.zip?alt=media&token=d1980ab9-c365-4585-b226-5360874ee9e4"
				>
					Download v1.2.10.4 Mod Pack
				</a></svelte:fragment
			>
		</AccordionItem>
	</Accordion>
</section>
