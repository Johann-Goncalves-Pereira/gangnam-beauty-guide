import { describe, expect, it } from 'vitest'

import { parseTrustCardSearch } from '@features/trust-card/api/trust-card.search'

describe('parseTrustCardSearch', () => {
	it('returns empty search for invalid input', () => {
		expect(parseTrustCardSearch({ sample: 123 })).toEqual({})
	})

	it('parses a valid sample id', () => {
		expect(parseTrustCardSearch({ sample: 'rhinoplasty-honesty' })).toEqual({
			sample: 'rhinoplasty-honesty',
		})
	})
})
