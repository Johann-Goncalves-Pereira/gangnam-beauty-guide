import { Effect } from 'effect'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { extractReview } from '@features/trust-card/api/trust-card.api'

describe('extractReview', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.restoreAllMocks()
	})

	it('posts source text and decodes the trust card response', async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(
				JSON.stringify({
					trustCard: {
						sourceText: '한국어 리뷰 텍스트입니다 충분히 깁니다',
						translatedText: 'A long enough Korean review in English.',
						clinic: { displayName: 'Test Clinic', aliases: [] },
						procedure: { name: 'Rhinoplasty', category: 'nose' },
						trustSignals: ['surgeon_named'],
						redFlags: [],
						sentiment: 'positive',
						confidence: 0.8,
					},
				}),
				{ status: 200 },
			),
		)
		vi.stubGlobal('fetch', fetchMock)

		const result = await Effect.runPromise(
			extractReview('한국어 리뷰 텍스트입니다 충분히 깁니다'),
		)

		expect(result.trustCard.clinic.displayName).toBe('Test Clinic')
		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringMatching(/\/api\/extract-review$/),
			expect.objectContaining({ method: 'POST' }),
		)
	})
})
