export const JWT_STORAGE_KEY = 'stem_slide_token';

export function retrieveJWT() {
	return localStorage.getItem(JWT_STORAGE_KEY);
}
