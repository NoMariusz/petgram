import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from './constants';

export interface ApiRequestOptions {
	jsonBody?: unknown;
	payload?: FormData;
	headers?: HeadersInit;
	skipLoginRedirect?: boolean;
}

export class ApiRequestError extends Error {
	status: number;
	payload?: unknown;

	constructor(message: string, status: number, payload?: unknown) {
		super(message);
		this.name = 'ApiRequestError';
		this.status = status;
		this.payload = payload;
	}
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

export async function apiRequestJson<T>(
	path: string,
	method: string = 'GET',
	options: ApiRequestOptions = {},
): Promise<T> {
	const res = await apiRequest(path, method, options);
	const isNoContent = res.status === 204;
	let payload: unknown = null;

	if (!isNoContent) {
		try {
			payload = await res.json();
		} catch (error) {
			if (!res.ok) {
				throw new ApiRequestError(
					`Request failed (${res.status})`,
					res.status,
				);
			}
			throw new Error('Failed to parse response JSON.');
		}
	}

	if (!res.ok) {
		let message = `Request failed (${res.status})`;
		if (
			payload &&
			typeof payload === 'object' &&
			'error' in payload &&
			typeof (payload as { error?: unknown }).error === 'string'
		) {
			message = (payload as { error: string }).error;
		}
		throw new ApiRequestError(message, res.status, payload);
	}

	return payload as T;
}
