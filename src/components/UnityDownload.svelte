<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><strong>Skater XL v1.2.2.8 (Alpha)</strong></svelte:fragment>
		<svelte:fragment slot="content">
			<a
				class="btn variant-filled-secondary no-underline"
				href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Alpha/UnityModManager-21-0-27-4-1690201835.zip"
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
				class="btn variant-filled-secondary no-underline"
				href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Public/UnityModManager-21-0-27-7-1694510711.zip"
			>
				Download UnityModManager v0.27.7
			</a></svelte:fragment
		>
	</AccordionItem>
</Accordion>
