declare namespace App {
	interface Locals {
		user?: {
			uid: string;
			displayName: string;
			email: string;
			// Add more properties here as needed, with specific types
			photoURL?: string;
			providerId?: string;
		};
	}
}
