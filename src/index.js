/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'GET') {
			const html = `
				<!DOCTYPE html>
				<html>
				<head>
					<title>Message Form</title>
				</head>
				<body>
					<form method="POST">
						<label for="message">Enter your message:</label>
						<input type="text" id="message" name="message" required>
						<button type="submit">Submit</button>
					</form>
				</body>
				</html>
			`;
			return new Response(html, {
				headers: { 'Content-Type': 'text/html' },
			});
		} else if (request.method === 'POST') {
			const formData = await request.formData();
			const message = formData.get('message');
			await env.MESSAGES.put('message', message);
			return new Response('Message stored successfully!');
		} else {
			return new Response('Method not allowed', { status: 405 });
		}
	},
};
