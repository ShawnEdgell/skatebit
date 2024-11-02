<script lang="ts">
	import type { Post } from '$lib';

	export let post: Post;
</script>

<div class="not-prose mt-4 space-y-2">
	<h3 class="text-xl lg:text-2xl">{post.title}</h3>
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
	<div>
		<a class="btn btn-neutral mb-2" href="/posts/{post.id}">View Post</a>
	</div>
</div>
