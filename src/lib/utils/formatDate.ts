// src/lib/utils/formatDate.ts
import type { Timestamp } from 'firebase/firestore';

export function formatDate(date: Date | Timestamp | null): string {
	if (!date) return '';
	if ('toDate' in date) date = date.toDate();
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}
