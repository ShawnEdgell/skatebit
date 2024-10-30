<script lang="ts">
	import type { Post } from '$lib/types/Post';

	export let post: Post;
</script>

<a class="no-underline" href="/posts/{post.id}">
	<div class="card space-y-2 hover:bg-surface-hover-token font-normal p-4">
		<header class="card-header p-0 text-2xl text-secondary-500 font-semibold pb-1">
			{post.title}
		</header>
		<footer class="card-footer text-sm p-0">
			Posted by {post.userName} on {new Date(post.createdAt.seconds * 1000).toLocaleString()}
		</footer>
		<section class="text-base">
			{post.description.length > 100 ? `${post.description.slice(0, 100)}...` : post.description}
		</section>
	</div>
</a>
