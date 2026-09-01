import { Schema } from 'effect'
import { describe, expect, it } from 'vitest'

import { TrustCard } from '@features/trust-card/api/trust-card.schema'
import {
	getDefaultSample,
	getSampleById,
	reviewSamples,
} from '@features/trust-card/data/review-samples'

describe('review-samples', () => {
	it('has at least four curated samples', () => {
		expect(reviewSamples.length).toBeGreaterThanOrEqual(4)
	})

	it('decodes every golden trust card through the schema', () => {
		for (const sample of reviewSamples) {
			const decoded = Schema.decodeUnknownSync(TrustCard)(sample.trustCard)
			expect(decoded.sourceText).toBe(sample.sourceText)
		}
	})

	it('returns samples by id and falls back to default', () => {
		expect(getSampleById('rhinoplasty-honesty')?.label).toMatch(/Honesty/)
		expect(getSampleById('missing')).toBeUndefined()
		expect(getDefaultSample().id).toBe(reviewSamples[0]?.id)
	})
})
