/**
 * Determines if the current device is a mobile device based on the user agent.
 * @returns {boolean} True if mobile, else false.
 */
export const isMobileDevice = (): boolean =>
	typeof navigator !== 'undefined' &&
	/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
