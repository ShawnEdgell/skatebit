// src/app.d.ts

declare global {
	namespace App {
		interface Locals {
			user: {
				uid: string;
				email?: string;
				name?: string;
				picture?: string;
			} | null;
		}
	}
}

export {};
