<script lang="ts">
	const navigationData = [
		{
			title: 'Explore',
			links: [
				{ href: '/docs/news', text: 'News' },
				{ href: '/docs/info', text: 'Info' }
			]
		},
		{
			title: 'Games',
			links: [
				{ href: '/skaterxl/about', text: 'Skater XL' },
				{ href: '/session/about', text: 'Session: Skate Sim' },
				{ href: '/skate/about', text: 'Skate' },
				{ href: '/bmxstreets/about', text: 'BMX Streets' }
			]
		}
	];
</script>

<div class="flex gap-16">
	{#each navigationData as section}
		<ul class="space-y-3">
			<li><h3 class="mb-6">{section.title}</h3></li>
			{#each section.links as link}
				<li>
					<a href={link.href} class="underline text-primary-500" data-sveltekit-preload-data="hover"
						>{link.text}</a
					>
				</li>
			{/each}
		</ul>
	{/each}
</div>
