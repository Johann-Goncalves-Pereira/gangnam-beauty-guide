import { apiPost, runApiPromise } from '@lib/api-client'

import {
	ExtractReviewRequest,
	ExtractReviewResponse,
} from '@features/trust-card/api/trust-card.schema'

export function extractReview(sourceText: string, signal?: AbortSignal) {
	const options = signal ? { signal } : {}
	return apiPost(
		'/api/extract-review',
		ExtractReviewResponse,
		ExtractReviewRequest,
		{ sourceText },
		options,
	)
}

export function extractReviewPromise(sourceText: string, signal?: AbortSignal) {
	return runApiPromise(extractReview(sourceText, signal))
}
