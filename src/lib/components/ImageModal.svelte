<script lang="ts">
	export let imageUrl: string;
	export let altText: string = 'Image';
	export let buttonText: string = 'Open Image';

	let modal: HTMLDialogElement;
</script>

<button class="btn" on:click={() => modal.showModal()}>{buttonText}</button>

<dialog bind:this={modal} class="modal">
	<div class="modal-box max-w-fit">
		<img src={imageUrl} alt={altText} />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>Close</button>
	</form>
</dialog>
