export const JWT_STORAGE_KEY = 'token';

export function retrieveJWT() {
	return localStorage.getItem(JWT_STORAGE_KEY);
}
