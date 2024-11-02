// src/lib/firebaseAdmin.ts
import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';
import {
	FIREBASE_PROJECT_ID,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY
} from '$env/static/private';

// Define a type for the service account credentials
interface FirebaseServiceAccount extends ServiceAccount {
	projectId: string;
	clientEmail: string;
	privateKey: string;
}

// Assemble the service account credentials
const serviceAccount: FirebaseServiceAccount = {
	projectId: FIREBASE_PROJECT_ID,
	clientEmail: FIREBASE_CLIENT_EMAIL,
	privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
};

// Initialize Firebase Admin only once
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}

// Export the Firestore instance for server-side operations
const firestore = admin.firestore();

export { firestore };
