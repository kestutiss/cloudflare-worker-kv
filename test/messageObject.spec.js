import { describe, it, expect } from 'vitest';
import { MessageObject } from '../src/messageObject';

describe('MessageObject', () => {
	let state;
	let env;
	let messageObject;

	beforeEach(() => {
		state = { storage: new Map() };
		env = {};
		messageObject = new MessageObject(state, env);
	});

	it('stores a message with timestamp', async () => {
		const message = 'Test message';
		await messageObject.storeMessage(message);
		const storedMessage = await messageObject.retrieveMessage();
		expect(storedMessage).toContain(message);
		expect(storedMessage).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
	});

	it('retrieves the stored message', async () => {
		const message = 'Test message';
		await messageObject.storeMessage(message);
		const storedMessage = await messageObject.retrieveMessage();
		expect(storedMessage).toBe(`${message} - ${new Date().toISOString()}`);
	});
});
