import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new Request('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch(request, env, ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});
});

describe('Message worker', () => {
	it('stores a message with timestamp (POST request)', async () => {
		const request = new Request('http://example.com', {
			method: 'POST',
			body: new URLSearchParams({ message: 'Test message' }),
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const responseText = await response.text();
		expect(responseText).toContain('Stored message: Test message - ');
	});

	it('retrieves the stored message (GET request)', async () => {
		const request = new Request('http://example.com');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const responseText = await response.text();
		expect(responseText).toContain('<label for="message">Enter your message:</label>');
	});
});
