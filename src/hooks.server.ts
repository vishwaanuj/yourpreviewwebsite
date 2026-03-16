import type { Handle } from '@sveltejs/kit';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const handle: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') ?? '';
	const hostname = host.split(':')[0].toLowerCase();

	// Extract subdomain — works for  *.localhost  and  *.yourdomain.com
	// e.g.  santilondon.localhost  →  subdomain = "santilondon"
	//       medspalomdon.bippo.shop →  subdomain = "medspalondon"
	const parts = hostname.split('.');
	// For *.localhost (2 parts) or *.domain.tld (3+ parts), the first segment is the subdomain
	const isSubdomain = parts.length >= 2 && parts[0] !== 'www' && parts[0] !== 'localhost';

	if (isSubdomain) {
		const subdomain = parts[0];
		const staticPath = join('static', `${subdomain}.html`);

		if (existsSync(staticPath)) {
			const html = readFileSync(staticPath, 'utf-8');
			return new Response(html, {
				headers: { 'content-type': 'text/html; charset=utf-8' }
			});
		}
	}

	return resolve(event);
};