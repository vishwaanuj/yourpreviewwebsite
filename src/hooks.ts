import type { Reroute } from '@sveltejs/kit';

export const transport = {};

export const reroute: Reroute = ({ url }) => {
	const host = url.hostname.toLowerCase();
	const isSantiLondonHost = host === 'santillondon.localhost' || host.startsWith('santillondon.');

	if (!isSantiLondonHost) {
		return;
	}

	if (url.pathname === '/' || url.pathname === '') {
		return '/santilondon';
	}
};
