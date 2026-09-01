import { describe, expect, it } from 'vitest'

import { extractOpenAiContent } from '@features/trust-card/lib/openai-response'

describe('extractOpenAiContent', () => {
	it('extracts message content from a valid OpenAI response', () => {
		const content = extractOpenAiContent({
			choices: [{ message: { content: '{"trustCard":{}}' } }],
		})
		expect(content).toBe('{"trustCard":{}}')
	})

	it('throws when choices are missing', () => {
		expect(() => extractOpenAiContent({})).toThrow('no choices')
	})

	it('throws when content is empty', () => {
		expect(() =>
			extractOpenAiContent({
				choices: [{ message: { content: '' } }],
			}),
		).toThrow('empty content')
	})
})
