<script lang="ts">
	import { sounds } from '$lib';
</script>

<section>
	<h2>Sound Packs</h2>
	<p>Download sound packs for the Soundmod to enhance your Skater XL experience.</p>

	{#each sounds as sound}
		<div class="sound-item">
			<h3>{sound.title}</h3>

			{#if sound.note}
				<p><strong>Note:</strong> {sound.note}</p>
			{/if}

			{#if sound.downloadLinks && sound.downloadLinks.length > 0}
				<p><strong>Download Links:</strong></p>
				<ul>
					{#each sound.downloadLinks as { url, label }}
						<li><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</section>
