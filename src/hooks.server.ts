import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') ?? '';
	const hostname = host.split(':')[0].toLowerCase();

	const parts = hostname.split('.');

	// Detect subdomain
	const isSubdomain =
		parts.length >= 2 &&
		parts[0] !== 'www' &&
		parts[0] !== 'localhost';

	if (isSubdomain) {
		const subdomain = parts[0];

		// Rewrite URL internally
		event.url.pathname = `/${subdomain}${event.url.pathname}`;
	}

	return resolve(event);
};