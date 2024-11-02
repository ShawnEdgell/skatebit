// src/lib/utils/device.ts

/**
 * Detects if the current device is a mobile device.
 * @returns {boolean} True if mobile, else false.
 */
export function isMobileDevice(): boolean {
	if (typeof navigator === 'undefined') return false;
	return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
