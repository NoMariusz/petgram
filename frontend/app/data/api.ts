import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from './constants';

export interface ApiRequestOptions {
	jsonBody?: unknown;
	payload?: FormData;
	headers?: HeadersInit;
	skipLoginRedirect?: boolean;
}

function getAccessToken() {
	if (typeof window === 'undefined') {
		return null;
	}

	return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}

export async function apiRequest(
	path: string,
	method: string = 'GET',
	options: ApiRequestOptions = {},
) {
	const apiUrl = import.meta.env.VITE_API_BASE_URL;
	if (!apiUrl) {
		throw new Error('API URL is not configured.');
	}

	const headers = new Headers(options.headers);
	const accessToken = getAccessToken();
	if (accessToken) {
		headers.set('Authorization', `Bearer ${accessToken}`);
	}
	let body: BodyInit | undefined;

	if (options.payload) {
		body = options.payload;
	} else if (options.jsonBody !== undefined) {
		headers.set('Content-Type', 'application/json');
		body = JSON.stringify(options.jsonBody);
	}

	const res = await fetch(`${apiUrl}${path}`, {
		method,
		headers,
		body,
	});

	if (res.status === 401 && !options.skipLoginRedirect) {
		// Handle unauthorized access, e.g., redirect to login page
		window.location.href = '/login';
	}
	return res;
}
