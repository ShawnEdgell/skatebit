// src/lib/firebaseAdmin.ts
import admin from 'firebase-admin';
import {
	FIREBASE_PROJECT_ID,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY
} from '$env/static/private';

// Initialize Firebase Admin only once with service account credentials
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: FIREBASE_PROJECT_ID,
			clientEmail: FIREBASE_CLIENT_EMAIL,
			privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
		})
	});
}

// Export Firestore instance for server-side operations
export const firestore = admin.firestore();
