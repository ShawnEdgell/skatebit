<script lang="ts">
	import ImageModal from '$lib/components/ImageModal.svelte';
</script>

<h2>Getting Started with Skater XL Modding</h2>
<p>Learn how to install script mods for Skater XL step by step using UnityModManager.</p>

<!-- Getting Started Guide -->
<section class="space-y-4">
	<!-- Card 1: Check Your Game Version -->
	<div class="not-prose">
		<div class="card card-lg bg-base-200 shadow-sm">
			<div class="card-body">
				<span class="badge badge-warning">Step 1</span>
				<h2 class="card-title mb-6 text-2xl">Check Your Game Version</h2>
				<p>
					Ensure you know your Skater XL version before moving on, as mod compatibility varies by
					version.
				</p>
				<ul class="mt-3 flex list-disc flex-col gap-2 pl-5">
					<li>Launch Skater XL</li>
					<li>Check your game version in the bottom left corner</li>
				</ul>
				<ImageModal imageUrl="Step1.webp" altText="Step Image" buttonText="View Example" />
			</div>
		</div>
	</div>

	<!-- Card 2: Changing Game Versions (Optional) -->
	<div class="not-prose">
		<div class="card card-lg bg-base-200 shadow-sm">
			<div class="card-body">
				<span class="badge badge-warning">Step 2</span>
				<h2 class="card-title mb-6 text-2xl">Changing Game Versions (Optional)</h2>
				<p>
					Skater XL 1.2.2.8 (Alpha) and 1.2.10.4 (None/Public) are the most popular versions for
					modding.
				</p>
				<ul class="mt-3 flex list-disc flex-col gap-2 pl-5">
					<li>Right click Skater XL in Steam</li>
					<li>Select Properties &gt; Betas</li>
					<li>Choose your desired version from the dropdown menu</li>
				</ul>
				<ImageModal imageUrl="Step2.webp" altText="Step Image" buttonText="View Example" />
			</div>
		</div>
	</div>

	<!-- Card 3: Download UnityModManager -->
	<div class="not-prose">
		<div class="card card-lg bg-base-200 shadow-sm">
			<div class="card-body">
				<span class="badge badge-warning">Step 3</span>
				<h2 class="card-title mb-6 text-2xl">Download UnityModManager</h2>
				<p>Download the UnityModManager application to start installing mods.</p>
				<ul class="mt-3 flex list-disc flex-col gap-2 pl-5">
					<li>Visit the Nexus Mods website</li>
					<li>Create an account or log in</li>
					<li>Download the latest version of UnityModManager</li>
				</ul>
				<a
					href="https://www.nexusmods.com/site/mods/21?tab=files"
					class="btn btn-soft mt-6 no-underline"
					target="_blank"
				>
					Nexus Mods Website
				</a>
			</div>
		</div>
	</div>

	<!-- Card 4: UnityModManager Setup -->
	<div class="not-prose">
		<div class="card card-lg bg-base-200 shadow-sm">
			<div class="card-body">
				<span class="badge badge-warning">Step 4</span>
				<h2 class="card-title mb-6 text-2xl">UnityModManager Setup</h2>
				<p>Follow these steps to set up UnityModManager correctly for Skater XL.</p>
				<ul class="mt-3 flex list-disc flex-col gap-2 pl-5">
					<li>Unzip the file, open the folder, and run UnityModManager.exe.</li>
					<li>If playing on version 1.2.2.8 (Alpha), select "Skater XL v1.2.2.8" as your game.</li>
					<li>If playing a different version, simply select "Skater XL" as your game.</li>
					<li>
						Set the game path to: C: / ProgramFiles(x86) / Steam / steamapps / common/ SkaterXL
					</li>
					<li>Click Install or Update to complete the setup.</li>
				</ul>
				<ImageModal imageUrl="Step3.webp" altText="Step Image" buttonText="View Example" />
			</div>
		</div>
	</div>

	<!-- Card 5: Install Mods -->
	<div class="not-prose">
		<div class="card card-lg bg-base-200 shadow-sm">
			<div class="card-body">
				<span class="badge badge-warning">Step 5</span>
				<h2 class="card-title mb-6 text-2xl">Install Mods</h2>
				<p>Once UnityModManager is installed, you can start adding mods.</p>
				<ul class="mt-3 flex list-disc flex-col gap-2 pl-5">
					<li>Select the "Mods" tab in UnityModManager.</li>
					<li>Download your desired mods from the Mods page.</li>
					<li>
						Drag and drop the downloaded .zip files into the UnityModManager window to install them.
					</li>
				</ul>
				<p class="mt-3">
					Status = "OK" means the mod is installed. If the status is blank, your mod is NOT
					installed.
				</p>
				<p class="mt-3">
					You can right-click each mod in your list to manually install/uninstall at any time.
				</p>
				<ImageModal imageUrl="Step4.webp" altText="Step Image" buttonText="View Example" />
			</div>
		</div>
	</div>

	<!-- Card 6: Launch Skater XL! -->
	<div class="not-prose">
		<div class="card card-lg bg-base-200 shadow-sm">
			<div class="card-body">
				<span class="badge badge-warning">Step 6</span>
				<h2 class="card-title mb-6 text-2xl">Launch Skater XL!</h2>
				<p>Upon launch, you should notice the Skater XL Mod Menu.</p>
				<p class="mt-3">If you do not see this menu, please refer back to Step 4.</p>
				<p class="mt-3">Enjoy your mods!</p>
				<ImageModal imageUrl="Step5.webp" altText="Step Image" buttonText="View Example" />
			</div>
		</div>
	</div>
</section>
