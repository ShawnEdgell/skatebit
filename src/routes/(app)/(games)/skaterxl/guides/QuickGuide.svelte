<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<article>
	<!-- Step 1: Check Your Game Version -->
	<div class="header">
		<h3 class="h3 mb-2">Step 1: Check Your Game Version</h3>
		<p>
			It's crucial to know which version of Skater XL you're installing mods into, as mod
			compatibility depends on your game version.
		</p>
		<p>
			Check your game version in the lower left corner at launch. v1.2.2.8 and v1.2.7.8 are the most
			common versions.
		</p>
		<img class="mb-8" src="/images/XLversion.webp" alt="Skater XL Version" loading="lazy" />
	</div>

	<!-- Step 2: Changing Game Versions -->
	<div class="header">
		<h3 class="h3 mb-2">Step 2: Changing Game Versions (optional)</h3>
		<p>
			If you'd like to change versions, right-click Skater XL in your Steam library, select
			Properties > Betas. Choose your preferred version from the dropdown menu.
		</p>
		<p>
			You can read more about each version in the cards above. Please note that the current Beta
			branch is outdated. We recommend using either Alpha or Public.
		</p>
		<img class="mb-8" src="/images/XLDowngrade2.webp" alt="Downgrade Step 1" loading="lazy" />
	</div>

	<!-- Step 3: Download UnityModManager -->
	<div class="header">
		<h3 class="h3 mb-2">Step 3: Download UnityModManager</h3>
		<p>
			Select your game version below and follow the link to download the corresponding
			UnityModManager (UMM) version.
		</p>
		<p>You will need to login to Nexusmods, then select "Slow Download."</p>

		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="summary">
					<strong>Skater XL Alpha v1.2.2.8</strong>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<a
						target="_blank"
						href="https://www.nexusmods.com/site/mods/21?tab=files&file_id=2224"
						class="btn variant-filled-secondary">UnityModManager v0.27.4</a
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
						href="https://www.nexusmods.com/site/mods/21?tab=files&file_id=2314"
						class="btn variant-filled-secondary">UnityModManager v0.27.7</a
					>
				</svelte:fragment>
			</AccordionItem>
			<!-- ... -->
		</Accordion>
	</div>

	<!-- Step 4: UnityModmanger Setup -->
	<div class="header">
		<h3 class="h3 mb-2">Step 4: UnityModManager Setup</h3>
		<p>
			After downloading, extract the .zip file. Open this folder to access UnityModManager.exe. Set
			the following paths:
		</p>
		<p><b>Game:</b> Skater XL</p>
		<p>
			<b>Folder:</b> This PC > Local Disk (C:) > Program Files (x86) > Steam > steamapps > common > Skater
			XL
		</p>
		<p>Click Install or Update to complete the setup.</p>
		<img class="mb-8" src="/images/UMM1.webp" alt="Unity Mod Manager Setup" loading="lazy" />
	</div>

	<!-- Step 5: Download and Install Mods -->
	<div class="header">
		<h3 class="h3 mb-2">Step 5: Download and Install Mods</h3>
		<p>
			Download compatible mods and drop them into UnityModManager. For a full list of working mods
			for your game, check out our Mods tab.
		</p>
		<blockquote class="blockquote mb-4">
			Note: In UnityModManager, "Status: OK" or "Status: Update to X.X.X" indicates a mod is
			installed. Avoid updating mods directly from UnityModManager, as changing versions may render
			them incompatible. For manual installation or uninstallation, right-click each mod.
		</blockquote>
		<img
			class="mb-8"
			src="/images/UMM2.webp"
			alt="Downloading and Installing Mods"
			loading="lazy"
		/>
	</div>

	<!-- Step 6: Launch Skater XL -->
	<div class="header">
		<h3 class="h3 mb-2">Step 6: Launch Skater XL</h3>
		<p>Launch Skater XL!</p>
		<p>
			UnityModManager will open, indicating mod status. A green icon suggests the mod is working,
			while a red icon indicates issues.
		</p>
		<img class="mb-8" src="/images/Home2.webp" alt="Launch Skater XL" loading="lazy" />
	</div>
</article>
