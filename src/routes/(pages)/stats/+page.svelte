<script lang="ts">
	import Header from '../../../components/Header.svelte';
	import DownloadSection from './DownloadSection.svelte';
	import HowToInstallSection from './HowToInstallSection.svelte';
</script>

<svelte:head>
	<title>Skatebit | Stats & Settings</title>
	<meta name="description" content="Get the latest stats from Milky and the community." />
</svelte:head>

<Header title="Stats & Settings" description="Get the latest stats from Milky and the community." />

<DownloadSection />
<hr />
<HowToInstallSection />
