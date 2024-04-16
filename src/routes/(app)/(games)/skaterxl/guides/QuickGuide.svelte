<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<article>
	<h3 class="h3 mb-2">Step 1: Check Your Game Version</h3>
	<p>
		Ensure you know your Skater XL version as mod compatibility varies by version. Check at launch
		in the lower left corner; v1.2.2.8 and v1.2.7.8 are most common.
	</p>
	<img class="mb-8" src="/images/XLversion.webp" alt="Skater XL Version" loading="lazy" />

	<h3 class="h3 mb-2">Step 2: Changing Game Versions (optional)</h3>
	<p>
		To switch versions, right-click Skater XL in Steam, select Properties > Betas, then choose from
		the dropdown. Note: The Beta branch is outdated; use Alpha or Public.
	</p>
	<img class="mb-8" src="/images/XLDowngrade2.webp" alt="Downgrade Step 1" loading="lazy" />

	<h3 class="h3 mb-2">Step 3: Download UnityModManager</h3>
	<p>
		Select your game version below and to download UnityModManager (UMM). It's very important that
		you download and use the correct one.
	</p>
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="summary">
				<strong>Skater XL Alpha v1.2.2.8</strong>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					target="_blank"
					href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Alpha/UnityModManager-21-0-27-4-1690201835.zip"
					download
					class="btn variant-filled-secondary">Download UnityModManager v0.27.4</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">
				<strong>Skater XL Public v1.2.7.8</strong>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					target="_blank"
					href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Public/UnityModManager-21-0-27-7-1694510711.zip"
					download
					class="btn variant-filled-secondary">Download UnityModManager v0.27.7</a
				>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<h3 class="h3 mb-2">Step 4: UnityModManager Setup</h3>
	<p>
		After downloading, unzip the file, open the folder, and run UnityModManager.exe. Set the game
		path to: This PC > Local Disk (C:) > Program Files (x86) > Steam > steamapps > common > Skater
		XL. Click 'Install or Update' to complete setup.
	</p>
	<img class="mb-8" src="/images/UMM1.webp" alt="Unity Mod Manager Setup" loading="lazy" />
	<aside class="alert variant-ghost-error mb-6">
		<!-- Icon -->
		<div>
			<svg class="w-12 h-12" viewBox="0 0 24 24" fill="none">
				<path
					d="M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3" data-toc-ignore>"Method on Enter not found" error</h3>
			<p>
				If you encounter errors like "method on enter" or "method on start," it indicates a mismatch
				between your game version and the UnityModManager (UMM) version. To resolve this, revisit
				steps 1, 2, and 3 to verify your game version and ensure you download the appropriate UMM.
				For clarity, we recommend removing any previously downloaded versions of UnityModManager.
			</p>
		</div>
	</aside>
	<h3 class="h3 mb-2">Step 5: Download and Install Mods</h3>
	<p>
		Download mods compatible with your game version and drop them into UnityModManager. Check our
		Mods tab for a list of functional mods.
	</p>
	<blockquote class="blockquote mb-4">
		Note: "Status: OK" or "Update to X.X.X" in UnityModManager means a mod is installed. Do not
		update mods within the manager as it may cause compatibility issues. For manual changes,
		right-click the mod.
	</blockquote>
	<img class="mb-8" src="/images/UMM2.webp" alt="Downloading and Installing Mods" loading="lazy" />

	<h3 class="h3 mb-2">Step 6: Launch Skater XL</h3>
	<p>
		Start Skater XL. UnityModManager will show each mod's status: green for functioning and red for
		problems.
	</p>
	<img class="mb-8" src="/images/Home2.webp" alt="Launch Skater XL" loading="lazy" />
</article>
