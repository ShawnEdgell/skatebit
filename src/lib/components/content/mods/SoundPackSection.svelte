<script lang="ts">
	import { sounds } from '$lib';
</script>

<section>
	<p class="mb-6">Download sound packs for the Soundmod to enhance your Skater XL experience.</p>

	<div class="space-y-4 not-prose">
		{#each sounds as sound, index}
			<div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2">
				<input type="radio" name="sound-accordion" id={`sound-${index}`} class="peer" />
				<label for={`sound-${index}`} class="collapse-title text-xl font-medium cursor-pointer">
					{sound.title}
				</label>
				<div class="collapse-content space-y-1">
					{#if sound.note}
						<p><strong>Note:</strong> {sound.note}</p>
					{/if}

					{#if sound.downloadLinks && sound.downloadLinks.length > 0}
						<p><strong>Download Links:</strong></p>
						<ul class="list-disc list-inside">
							{#each sound.downloadLinks as { url, label }}
								<li>
									<a
										class="text-blue-500 underline"
										href={url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	/* Optional: Add any additional styles here */
</style>
