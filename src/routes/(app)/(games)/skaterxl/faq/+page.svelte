<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
			<h1>Frequently Asked Questions</h1>
			<p>
				Find answers to some of the most common questions about Skater XL and its modding community.
			</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Boned Ollie settings not working</h2>
			<p>
				Issues with the Boned Ollie settings are common, often due to the mod's advanced nature.
			</p>
			<p>
				If you've recently installed stats or settings, verify their functionality by checking the
				sliders. You'll need to manually navigate through each trick to understand the inputs
				required, which makes using presets initially challenging.
			</p>
			<p>
				If your custom settings aren't working, the issue may be incorrect inputs, improper stat
				setup, or using an incompatible version of the mod.
			</p>
			<p>
				For detailed assistance, refer to the BonedOllieMod guide in our Guides section, which
				provides all the necessary information.
			</p>
			<hr class="!border-t-1" />
		</div>

		<div>
			<h2>UnityModManager "method on start not found" error</h2>
			<p>
				If you encounter errors like "method on enter" or "method on start," it indicates a mismatch
				between your game version and the UnityModManager (UMM) version. To resolve this, verify
				your game version and ensure you download the appropriate UMM. For clarity, we recommend
				removing any previously downloaded versions of UnityModManager.
			</p>
			<hr class="!border-t-1" />
		</div>
		<div>
			<h2>Skater keeps falling through the floor, can't land anything</h2>
			<p>
				You likely have the wrong version of XXL Mod for your game. Make sure to download the
				correct stats menu mod from DawgVinci's Discord to fix this. (XXL v1.3.3 for the Alpha
				branch, or XL Mod for the Public branch)
			</p>
			<hr class="!border-t-1" />
		</div>
		<div>
			<h2>How do I find out which game version I am running?</h2>
			<p>
				When you first load up Skater XL, the game version will be listed as a number in the
				bottom-left corner of the screen. Right now the most common versions are 1.2.2.8 and
				1.2.7.8.
			</p>
			<hr class="!border-t-1" />
		</div>
		<div>
			<h2>How do I change my game version?</h2>
			<p>
				In steam, right-click on Skater XL, select Properties, then Betas. From there, you can
				select the version you want to play in the drop-down menu. Note: The Beta branch is
				outdated; use Alpha or Public.
			</p>
			<hr class="!border-t-1" />
		</div>
		<div>
			<h2>Board wont stop flipping</h2>
			<p>
				If you're experiencing issues, it may be due to the "Realistic Manual Catch" setting enabled
				in the catch tab of the XXL or XL Mod. To resolve this, switch the setting to "Auto."
				Alternatively, you can manually catch the board by clicking your sticks.
			</p>
			<hr class="!border-t-1" />
		</div>
		<div>
			<h2>Haven't played in a while, all of my mods are broken</h2>
			<p>
				We recommend starting fresh with Skater XL mods. If your game has automatically updated
				through Steam, your mods may be outdated. Follow our updated modding guides for
				assistance—the modding process remains unchanged. For a list of currently functioning mods,
				please check our Mods tab.
			</p>
		</div>
	</article>
</div>
