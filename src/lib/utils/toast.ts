// utils/toast.ts
import { toast } from '$lib/stores/toast';

let timeout: ReturnType<typeof setTimeout>;

export function showToast(
	message: string,
	type: 'info' | 'success' | 'error' = 'info',
	persist = false,
	duration = 3000
) {
	clearTimeout(timeout);
	toast.set({ message, type, visible: true });

	// Persist to sessionStorage if needed
	if (persist) {
		sessionStorage.setItem('__toast', JSON.stringify({ message, type, visible: true }));
		return;
	}

	timeout = setTimeout(() => {
		toast.set({ message: '', type, visible: false });
	}, duration);
}
