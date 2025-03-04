<script lang="ts">
	import ImageModal from '$lib/components/ImageModal.svelte';

	const steps = [
		{
			step: 'Step 1',
			title: 'Check Your Game Version',
			descriptionTop: [
				'Ensure you know your Skater XL version before moving on, as mod compatibility varies by version.'
			],
			list: ['Launch Skater XL', 'Check your game version in the bottom left corner'],
			imageUrl: 'Step1.webp'
		},
		{
			step: 'Step 2',
			title: 'Changing Game Versions (Optional)',
			descriptionTop: [
				'Skater XL 1.2.2.8 (Alpha) and 1.2.10.4 (None/Public) are the most popular versions for modding.'
			],
			list: [
				'Right click Skater XL in Steam',
				'Select Properties > Betas',
				'Choose your desired version from the dropdown menu'
			],
			imageUrl: 'Step2.webp'
		},
		{
			step: 'Step 3',
			title: 'Download UnityModManager',
			descriptionTop: ['Download the UnityModManager application to start installing mods.'],
			list: [
				'Visit the Nexus Mods website',
				'Create an account or log in',
				'Download the latest version of UnityModManager'
			],
			link: { url: 'https://www.nexusmods.com/site/mods/21?tab=files', text: 'Nexus Mods Website' }
		},
		{
			step: 'Step 4',
			title: 'UnityModManager Setup',
			descriptionTop: ['Follow these steps to set up UnityModManager correctly for Skater XL.'],
			list: [
				'Unzip the file, open the folder, and run UnityModManager.exe.',
				"If playing on version 1.2.2.8 (Alpha), select 'Skater XL v1.2.2.8' as your game.",
				"If playing a different version, simply select 'Skater XL' as your game.",
				'Set the game path to: C: / ProgramFiles(x86) / Steam / steamapps / common / SkaterXL',
				'Click Install or Update to complete the setup.'
			],
			imageUrl: 'Step3.webp'
		},
		{
			step: 'Step 5',
			title: 'Install Mods',
			descriptionTop: ['Once UnityModManager is installed, you can start adding mods.'],
			list: [
				"Select the 'Mods' tab in UnityModManager.",
				'Download your desired mods from the Mods page.',
				'Drag and drop the downloaded .zip files into the UnityModManager window to install them.'
			],
			descriptionBottom: [
				"Status = 'OK' means the mod is installed. If the status is blank, your mod is NOT installed.",
				'You can right-click each mod in your list to manually install/uninstall at any time.'
			],
			imageUrl: 'Step4.webp'
		},
		{
			step: 'Step 6',
			title: 'Launch Skater XL!',
			descriptionTop: ['Upon launch, you should notice the Skater XL Mod Menu.'],
			list: [],
			descriptionBottom: [
				'If you do not see this menu, please refer back to Step 4.',
				'Enjoy your mods!'
			],
			imageUrl: 'Step5.webp'
		}
	];
</script>

<h2>Getting Started with Skater XL Modding</h2>
<p>Learn how to install script mods for Skater XL step by step using UnityModManager.</p>

<div class="flex flex-col gap-4">
	{#each steps as { step, title, list, descriptionTop, descriptionBottom, imageUrl, link }}
		<div class="not-prose">
			<div class="card card-lg bg-base-200 shadow-sm">
				<div class="card-body">
					<span class="badge badge-warning">{step}</span>
					<h2 class="card-title text mb-6 text-2xl">{title}</h2>

					{#if descriptionTop}
						{#each descriptionTop as desc}
							<p>{desc}</p>
						{/each}
					{/if}

					{#if list.length > 0}
						<ul class="mt-3 flex list-disc flex-col gap-2 pl-5">
							{#each list as item}
								<li>{item}</li>
							{/each}
						</ul>
					{/if}

					{#if descriptionBottom}
						{#each descriptionBottom as desc}
							<p class="mt-3">{desc}</p>
						{/each}
					{/if}

					{#if link}
						<a href={link.url} class="btn btn-soft mt-6 no-underline" target="_blank">{link.text}</a
						>
					{/if}

					{#if imageUrl}
						<ImageModal {imageUrl} altText="Step Image" buttonText="View Example" />
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
