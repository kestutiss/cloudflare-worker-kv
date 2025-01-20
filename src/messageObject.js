export class MessageObject {
	constructor(state, env) {
		this.state = state;
		this.env = env;
		this.storage = state.storage;
	}

	async fetch(request) {
		const url = new URL(request.url);
		if (request.method === 'POST') {
			const { message } = await request.json();
			await this.storeMessage(message);
			return new Response(message);
		} else if (request.method === 'GET') {
			const message = await this.retrieveMessage();
			return new Response(message);
		} else {
			return new Response('Method not allowed', { status: 405 });
		}
	}

	async storeMessage(message) {
		const timestamp = new Date().toISOString();
		const messageWithTimestamp = `${message} - ${timestamp}`;
		await this.storage.put('message', messageWithTimestamp);
	}

	async retrieveMessage() {
		const message = await this.storage.get('message');
		return message || 'No message stored';
	}
}
