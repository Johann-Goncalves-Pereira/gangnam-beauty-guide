import { Either, Schema } from 'effect'

import {
	ExtractReviewRequest,
	ExtractReviewResponse,
} from '../src/features/trust-card/api/trust-card.schema'
import { EXTRACT_REVIEW_SYSTEM_PROMPT } from './extract-review-prompt'

interface VercelRequest {
	readonly method?: string
	readonly body?: unknown
}

interface VercelResponse {
	status: (code: number) => VercelResponse
	json: (body: unknown) => void
}

interface OpenAiMessage {
	readonly role: 'system' | 'user'
	readonly content: string
}

function parseBody(body: unknown): unknown {
	if (typeof body === 'string') {
		return JSON.parse(body)
	}
	return body
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

function extractOpenAiContent(value: unknown): string {
	if (!isRecord(value)) {
		throw new Error('OpenAI returned invalid response')
	}

	const choices = value.choices
	if (!Array.isArray(choices) || choices.length === 0) {
		throw new Error('OpenAI returned no choices')
	}

	const first: unknown = choices.at(0)
	if (first === undefined || !isRecord(first)) {
		throw new Error('OpenAI returned invalid choice')
	}

	const message = first.message
	if (!isRecord(message)) {
		throw new Error('OpenAI returned no message')
	}

	const content = message.content
	if (typeof content !== 'string' || content.length === 0) {
		throw new Error('OpenAI returned empty content')
	}

	return content
}

async function callOpenAi(sourceText: string): Promise<unknown> {
	const apiKey = process.env.OPENAI_API_KEY
	if (!apiKey) {
		throw new Error('OPENAI_API_KEY is not configured')
	}

	const messages: readonly OpenAiMessage[] = [
		{ role: 'system', content: EXTRACT_REVIEW_SYSTEM_PROMPT },
		{ role: 'user', content: sourceText },
	]

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini',
			response_format: { type: 'json_object' },
			temperature: 0.2,
			messages,
		}),
	})

	const responseText = await response.text()
	if (!response.ok) {
		throw new Error(`OpenAI request failed: ${response.status} ${responseText}`)
	}

	const parsed: unknown = JSON.parse(responseText)
	const content = extractOpenAiContent(parsed)
	const trustCardJson: unknown = JSON.parse(content)
	return trustCardJson
}

export default async function handler(
	request: VercelRequest,
	response: VercelResponse,
): Promise<void> {
	if (request.method !== 'POST') {
		response.status(405).json({ error: 'Method not allowed' })
		return
	}

	const decoded = Either.getOrElse(
		Schema.decodeUnknownEither(ExtractReviewRequest)(parseBody(request.body)),
		() => null,
	)

	if (!decoded) {
		response.status(400).json({ error: 'Invalid request body' })
		return
	}

	try {
		const raw = await callOpenAi(decoded.sourceText)
		const trustCardResponse = Schema.decodeUnknownSync(ExtractReviewResponse)(
			raw,
		)
		response.status(200).json(trustCardResponse)
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Extraction failed'
		const status = message.includes('OPENAI_API_KEY') ? 503 : 500
		response.status(status).json({ error: message })
	}
}
