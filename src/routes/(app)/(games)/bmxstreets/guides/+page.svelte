<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | BMX Streets</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-surface mb-2">BMX Streets</span>
			<h1>Guides</h1>
			<p>Learn how to install mods and get the most out of BMX Streets. (Guide by Nolew)</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Custom Maps</h2>
			<p>To install custom maps, follow these steps:</p>
			<ol class="space-y-4 mb-6">
				<li>Extract the maps from their ZIP files.</li>
				<li>
					Move the extracted folders to: <code class="code">This PC/Documents/BMX Streets/Maps</code
					>
				</li>
			</ol>
		</div>
		<div>
			<h2>Installing Script Mods</h2>
			<p><i>Credits to Nolew for the guide!</i></p>
			<p>
				Before installing MelonLoader, make sure you have the following prerequisites installed:
			</p>
			<ul class="space-y-4 mb-6">
				<li>
					<a
						href="https://dotnet.microsoft.com/en-us/download/dotnet-framework/thank-you/net48-offline-installer"
						target="_blank"
						class="btn variant-filled-secondary">.NET Framework 4.8</a
					>
				</li>
				<li>
					<a
						href="https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-desktop-6.0.29-windows-x64-installer"
						target="_blank"
						class="btn variant-filled-secondary">.NET Desktop Runtime 6.0 x64</a
					>
				</li>
				<li>
					<a
						href="https://aka.ms/vs/16/release/vc_redist.x64.exe"
						target="_blank"
						class="btn variant-filled-secondary"
						>Microsoft Visual C++ 2015-2019 Redistributable x64</a
					>
				</li>
			</ul>
			<p>Once you have the prerequisites, download and run the MelonLoader installer:</p>
			<a
				href="https://github.com/HerpDerpinstine/MelonLoader/releases/latest/download/MelonLoader.Installer.exe"
				target="_blank"
				class="btn variant-filled-secondary mb-6">Download MelonLoader</a
			>
			<p>
				In the installer, go to the Automated tab, click 'SELECT', and navigate to your BMX Streets
				.exe file located at:
			</p>
			<p><code class="code">C:\Program Files (x86)\Steam\steamapps\common\BMX Streets</code></p>

			<p>
				After installation, a 'Mods' folder will appear in your game directory. Simply drag and drop
				your .dll mod files into this folder. Launch the game to enjoy your mods!
			</p>
			<p>
				To uninstall or reinstall MelonLoader, run the installer again, locate the BMX Streets .exe
				file, and choose 'RE-INSTALL' or 'UN-INSTALL'.
			</p>
		</div>
	</article>
</div>
