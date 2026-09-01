import { describe, expect, it } from 'vitest'

import {
	formatConfidence,
	redFlagLabels,
	trustSignalLabels,
} from '@features/trust-card/lib/trust-card-labels'

describe('trust-card-labels', () => {
	it('formats confidence as a percentage', () => {
		expect(formatConfidence(0.91)).toBe('91%')
		expect(formatConfidence(0.5)).toBe('50%')
	})

	it('labels every trust signal and red flag', () => {
		expect(trustSignalLabels.surgeon_named).toBe('Surgeon named')
		expect(redFlagLabels.ghost_surgery_risk).toBe('Ghost surgery risk')
	})
})
