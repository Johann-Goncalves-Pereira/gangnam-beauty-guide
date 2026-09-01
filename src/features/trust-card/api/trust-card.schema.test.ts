import { Schema } from 'effect'
import { describe, expect, it } from 'vitest'

import {
	ExtractReviewRequest,
	TrustCard,
} from '@features/trust-card/api/trust-card.schema'
import { getSampleById } from '@features/trust-card/data/review-samples'

describe('TrustCard schema', () => {
	it('decodes a golden sample trust card', () => {
		const sample = getSampleById('rhinoplasty-honesty')
		expect(sample).toBeDefined()
		if (!sample) {
			return
		}

		const decoded = Schema.decodeUnknownSync(TrustCard)(sample.trustCard)
		expect(decoded.clinic.displayName).toBe('Honesty Plastic Surgery')
		expect(decoded.trustSignals).toContain('surgeon_named')
	})

	it('rejects extract requests shorter than 10 characters', () => {
		expect(() =>
			Schema.decodeUnknownSync(ExtractReviewRequest)({ sourceText: 'short' }),
		).toThrow()
	})

	it('accepts valid extract requests', () => {
		const decoded = Schema.decodeUnknownSync(ExtractReviewRequest)({
			sourceText: '한국어 리뷰 텍스트입니다',
		})
		expect(decoded.sourceText.length).toBeGreaterThanOrEqual(10)
	})
})
