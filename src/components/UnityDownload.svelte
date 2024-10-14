<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><strong>Skater XL v1.2.2.8 (Alpha)</strong></svelte:fragment>
		<svelte:fragment slot="content">
			<a
				class="btn mt-2 variant-filled-secondary no-underline"
				href="https://firebasestorage.googleapis.com/v0/b/skatebit-65c51.appspot.com/o/UnityModManager-21-0-27-4-1690201835.zip?alt=media&token=465b5662-90de-475f-940a-7300715eed7c"
			>
				Download UnityModManager v0.27.4
			</a></svelte:fragment
		>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><strong>Skater XL v1.2.10.4 (Public)</strong></svelte:fragment>
		<svelte:fragment slot="content">
			<a
				class="btn mt-2 variant-filled-secondary no-underline"
				href="https://firebasestorage.googleapis.com/v0/b/skatebit-65c51.appspot.com/o/UnityModManager-21-0-27-7-1694510711.zip?alt=media&token=05045745-822a-481a-9a98-b1c532af7ad6"
			>
				Download UnityModManager v0.27.7
			</a></svelte:fragment
		>
	</AccordionItem>
</Accordion>
