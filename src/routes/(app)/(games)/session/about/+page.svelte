<script lang="ts">
    import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
    <title>Skatebit | Session</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
    <article>
        <div class="header">
            <span class="badge variant-filled-error mb-2">Session</span>
            <h1>Session: The Authentic Skateboarding Sim</h1>
            <p>
                Immerse yourself in the world of Session, an authentic skateboarding simulation offering
                true-to-life experiences.
            </p>
            <hr class="!border-t-2" />
        </div>
        <div>
            <h2>Stay Updated</h2>
            <p>
                For the latest news and updates on Session and more, make sure to visit our News section
                regularly!
            </p>
            <a href="/docs/news" class="btn" data-sveltekit-preload-data="hover">Latest News</a>
        </div>
        <div>
            <h2>Join the Community</h2>
            <p>Ready to join the Session community? Connect with other skaters on the official Session Discord server!</p>
            <a href="https://discord.gg/session" target="_blank" class="btn">Crea-ture Studios Discord</a>
        </div>
        <div>
            <h2>Illusory Discord</h2>
            <p>
                Interested in getting the most out of Session? Join the Illusory Discord server to access custom mods, maps, gear, guides, and more.
            </p>
            <a href="https://discord.gg/65gAJju3pF" target="_blank" class="btn">Illusory Discord</a>
        </div>
    </article>
</div>
