export default {
	async fetch(request, env, ctx) {

		const url = new URL(request.url);
		const path = url.pathname.split('/')[1];

		if (path === '') {
			// If no path is provided, return a simple message
			return new Response('Welcome to the message service! Please provide a message path.', {
				headers: { 'Content-Type': 'text/plain' },
			});
		}

		const decodedPath = decodeURIComponent(path);
		const message = await env.MESSAGES.get(decodedPath);
		return new Response(`Message: ${message || `No message found for path: ${decodedPath}`}`, {
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },	
		});
	},
};
