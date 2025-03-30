export function getCurrentWeekId(): string {
	const now = new Date();
	const firstDayOfWeek = new Date(now);
	firstDayOfWeek.setDate(now.getDate() - now.getDay());
	firstDayOfWeek.setHours(0, 0, 0, 0);
	return firstDayOfWeek.toISOString().split('T')[0];
}

export function getEndOfCurrentWeek(): Date {
	const now = new Date();
	const endOfWeek = new Date(now);
	endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
	endOfWeek.setHours(0, 0, 0, 0);
	return endOfWeek;
}

export function getPreviousWeekId(): string {
	const now = new Date();
	const prevWeek = new Date(now);
	prevWeek.setDate(now.getDate() - now.getDay() - 7); // Go back one full week
	prevWeek.setHours(0, 0, 0, 0);
	return prevWeek.toISOString().split('T')[0];
}
