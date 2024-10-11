<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><strong>Skater XL v1.2.2.8 (Alpha)</strong></svelte:fragment>
		<svelte:fragment slot="content">
			<p>
				Download and extract the folder from the ZIP file. Inside, you'll find ZIP files for your
				mods. Just drag and drop them into UnityModManager. Make sure you're using version 0.27.4.
			</p>
			<a
				class="btn variant-filled-secondary no-underline"
				href="https://firebasestorage.googleapis.com/v0/b/stillmilkylive.appspot.com/o/XL%20Alpha%20(1.2.2.8)%20Mod%20Starter%20Pack.zip?alt=media&token=b61391d0-b0b7-4ad3-be73-712dd709c30c"
			>
				Download XL Alpha (1.2.2.8) Mod Starter Pack
			</a></svelte:fragment
		>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><strong>Skater XL v1.2.10.4 (Public)</strong></svelte:fragment>
		<svelte:fragment slot="content">
			<p>
				Download and extract the folder from the ZIP file. Inside, you'll find ZIP files for your
				mods. Just drag and drop them into UnityModManager. Make sure you're using version 0.27.7.
			</p>

			<a
				class="btn variant-filled-secondary no-underline"
				href="https://firebasestorage.googleapis.com/v0/b/stillmilkylive.appspot.com/o/XL%20Public%20(1.2.10.4)%20Mod%20Starter%20Pack.zip?alt=media&token=d1980ab9-c365-4585-b226-5360874ee9e4"
			>
				Download XL Public (1.2.10.4) Mod Starter Pack
			</a></svelte:fragment
		>
	</AccordionItem>
</Accordion>
