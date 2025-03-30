// src/lib/firebase/hallOfFame.ts
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './init';
import type { ClipPost } from '$lib/types/clips';

export async function saveWeeklyWinner(weekId: string): Promise<ClipPost | null> {
	const clipsRef = collection(db, 'clips');
	const q = query(clipsRef, where('weekId', '==', weekId), orderBy('likes', 'desc'), limit(1));
	const snapshot = await getDocs(q);

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	const winner = { id: doc.id, ...doc.data() } as ClipPost;

	// Check if already exists in hallOfFame
	const hofQuery = query(collection(db, 'hallOfFame'), where('weekId', '==', weekId));
	const hofSnapshot = await getDocs(hofQuery);
	if (!hofSnapshot.empty) return winner;

	// Save to Hall of Fame
	await addDoc(collection(db, 'hallOfFame'), {
		...winner,
		weekId
	});

	return winner;
}

export async function getHallOfFameEntries(): Promise<ClipPost[]> {
	const snapshot = await getDocs(collection(db, 'hallOfFame'));
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ClipPost[];
}
