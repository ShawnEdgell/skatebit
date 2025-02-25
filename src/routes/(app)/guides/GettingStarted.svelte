<script lang="ts">
	import ImageModal from '$lib/components/ImageModal.svelte';
</script>

<section>
	<h2>Step 1: Check Your Game Version</h2>
	<p>
		Ensure you know your Skater XL version, as mod compatibility varies by version. Check the
		version at launch in the lower-left corner; v1.2.2.8 and v1.2.10.4 are the most common.
	</p>
	<ImageModal imageUrl="Step1.webp" altText="Lateflip" buttonText="View Example" />
</section>

<section>
	<h2>Step 2: Changing Game Versions (Optional)</h2>
	<p>
		To switch versions, right-click Skater XL in Steam, select <b>Properties > Betas,</b> then choose
		from the dropdown.
	</p>
	<ImageModal imageUrl="Step2.webp" altText="Lateflip" buttonText="View Example" />
</section>

<section>
	<h2>Step 3: Download UnityModManager</h2>
	<p>
		Download the UnityModManager application to start installing mods. This tool is essential for
		managing and installing all Skater XL script mods. You will need to log in to Nexus Mods in
		order to download the file.
	</p>
	<p>
		The latest UnityModManager has been updated to work with any version of Skater XL. Make sure to
		select "Skater XL v1.2.2.8" as your game if you are playing on the Alpha branch.
	</p>
	<a
		href="https://www.nexusmods.com/site/mods/21?tab=files"
		class="btn btn-soft no-underline"
		target="_blank">Nexus Mods Website</a
	>
</section>

<section>
	<h2>Step 4: UnityModManager Setup</h2>
	<p>After downloading, unzip the file, open the folder, and run UnityModManager.exe.</p>
	<p>
		If you are playing on version 1.2.2.8 (Alpha), select 'Skater XL v1.2.2.8' as your game from the
		dropdown menu. If you are playing a different version, simply select 'Skater XL.'
	</p>
	<p>Set the game path to:</p>
	<p>C: / ProgramFiles(x86) / Steam / steamapps / common / SkaterXL</p>
	<p>Click <b>Install</b> or <b>Update</b> to complete the setup.</p>
	<ImageModal imageUrl="Step3.webp" altText="Lateflip" buttonText="View Example" />
</section>

<section>
	<h2>Step 5: Install Mods</h2>
	<p>Select the <b>Mods</b> tab in UnityModManager.</p>
	<p>
		Download your desired mods from the <a href="/mods" class="hover:no-underline">Mods</a> page. Drag
		and drop the downloaded .zip files into the UnityModManager window to install them.
	</p>
	<blockquote>
		Status = "OK" means the mod is installed. If the status is blank your mod is NOT installed. You
		can right click each mod in your list to manually install/uninstall at any time.
	</blockquote>
	<ImageModal imageUrl="Step4.webp" altText="Lateflip" buttonText="View Example" />
</section>

<section>
	<h2>Step 6: Launch Skater XL!</h2>
	<p>Upon launch you should notice the Skater XL Mod Menu.</p>
	<p>Status 🟢 = mod is working</p>
	<p>
		Status 🔴 = mod is NOT working (you should never see this, all broken mods should be removed)
	</p>
	<blockquote>
		If you do not see this menu it means UnityModMager is not installed. Please refer back to step
		4.
	</blockquote>
	<ImageModal imageUrl="Step5.webp" altText="Lateflip" buttonText="View Example" />
</section>
