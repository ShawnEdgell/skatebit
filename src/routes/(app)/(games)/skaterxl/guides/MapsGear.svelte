<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
</script>

<Stepper>
	<Step>
		<svelte:fragment slot="header">Step 1</svelte:fragment>

		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus eveniet alias blanditiis
			laboriosam placeat unde, voluptates earum corrupti officia exercitationem consequuntur modi
			distinctio in saepe, magni praesentium est nemo? Pariatur.
		</p>
	</Step>
	<Step>
		<svelte:fragment slot="header">Step 2</svelte:fragment>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, dolor illo nobis libero, hic
			corrupti necessitatibus quod tempore ad quae cupiditate aliquid nesciunt aspernatur saepe!
			Repellendus unde molestiae fugiat tempore.
		</p>
	</Step>
	<Step>
		<svelte:fragment slot="header">Step 3</svelte:fragment>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, hic totam similique animi
			repellat ducimus voluptate dolorum deleniti est, eius dicta? Blanditiis laboriosam, corporis
			veniam explicabo fugiat natus officia adipisci.
		</p>
	</Step>
	<!-- ... -->
</Stepper>
