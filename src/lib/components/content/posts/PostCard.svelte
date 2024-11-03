<script lang="ts">
	import type { Post } from '$lib';

	export let post: Post;
</script>

<a href="/posts/{post.id}" class="card bg-base-200 hover:bg-base-300 shadow-lg not-prose">
	<div class="card-body">
		<h2 class="card-title">{post.title}</h2>
		<div class="flex items-center gap-2 text-sm lg:text-base">
			{#if post.userPhotoURL}
				<img
					src={post.userPhotoURL}
					alt="{post.userName}'s profile picture"
					class="w-6 m-0 rounded-full"
				/>
			{/if}

			<p>
				Posted by {post.userName} on {new Date(post.createdAt.seconds * 1000).toLocaleString()}
			</p>
		</div>
		<section>
			<p>
				{post.description.length > 100 ? `${post.description.slice(0, 100)}...` : post.description}
			</p>
		</section>
	</div>
</a>
