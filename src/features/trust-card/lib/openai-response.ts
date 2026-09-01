function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

export function extractOpenAiContent(value: unknown): string {
	if (!isRecord(value)) {
		throw new Error('OpenAI returned invalid response')
	}

	const choices = value['choices']
	if (!Array.isArray(choices) || choices.length === 0) {
		throw new Error('OpenAI returned no choices')
	}

	const first: unknown = choices.at(0)
	if (first === undefined || !isRecord(first)) {
		throw new Error('OpenAI returned invalid choice')
	}

	const message = first['message']
	if (!isRecord(message)) {
		throw new Error('OpenAI returned no message')
	}

	const content = message['content']
	if (typeof content !== 'string' || content.length === 0) {
		throw new Error('OpenAI returned empty content')
	}

	return content
}
