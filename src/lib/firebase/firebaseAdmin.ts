import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { App } from 'firebase-admin/app';
import { config } from 'dotenv';

config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
	throw new Error('Missing Firebase Admin credentials.');
}

if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
	privateKey = privateKey.slice(1, -1).replace(/\\n/g, '\n');
}

const app: App =
	getApps().length === 0
		? initializeApp({
				credential: cert({
					projectId,
					clientEmail,
					privateKey
				})
			})
		: getApps()[0];

export const adminAuth = getAuth(app);
