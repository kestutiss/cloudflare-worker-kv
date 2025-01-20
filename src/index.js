import { MessageObject } from './messageObject';

export default {
	async fetch(request, env, ctx) {
		const id = env.MESSAGE_OBJECT.idFromName('MESSAGE_OBJECT');
		const obj = env.MESSAGE_OBJECT.get(id);

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
			const timestamp = new Date().toISOString();
			const messageWithTimestamp = `${message} - ${timestamp}`;
			const response = await obj.fetch('http://message-object', {
				method: 'POST',
				body: JSON.stringify({ message: messageWithTimestamp }),
			});
			const storedMessage = await response.text();
			return new Response(`Stored message: ${storedMessage}`);
		} else {
			return new Response('Method not allowed', { status: 405 });
		}
	},
};
