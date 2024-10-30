<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Post } from '$lib/types/Post';

	export let post: Post;
</script>

<a class="no-underline" href="/posts/{post.id}">
	<div class="card flex flex-col hover:bg-surface-hover-token font-normal p-4 gap-2">
		<span class="text-2xl font-semibold text-secondary-500">{post.title}</span>
		<div class="flex items-center gap-2 not-prose">
			{#if post.userPhotoURL}
				<Avatar
					src={post.userPhotoURL}
					alt="{post.userName}'s profile picture"
					class="w-6 m-0 rounded-full"
				/>
			{/if}

			Posted by {post.userName} on {new Date(post.createdAt.seconds * 1000).toLocaleString()}
		</div>
		<section>
			{post.description.length > 100 ? `${post.description.slice(0, 100)}...` : post.description}
		</section>
	</div>
</a>
