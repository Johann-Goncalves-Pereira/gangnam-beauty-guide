import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TrustCardResult } from '@features/trust-card/components/TrustCardResult'
import { getSampleById } from '@features/trust-card/data/review-samples'

import { renderWithProviders } from '@/test/test-utils'

describe('TrustCardResult', () => {
	it('renders trust signals for a positive sample', () => {
		const sample = getSampleById('rhinoplasty-honesty')
		expect(sample).toBeDefined()
		if (!sample) {
			return
		}

		renderWithProviders(<TrustCardResult card={sample.trustCard} />)

		expect(screen.getByText('Honesty Plastic Surgery')).toBeInTheDocument()
		expect(screen.getByText('Surgeon named')).toBeInTheDocument()
		expect(screen.getByText(/Confidence: 91%/)).toBeInTheDocument()
	})

	it('renders red flags for a negative sample', () => {
		const sample = getSampleById('filler-pressure')
		expect(sample).toBeDefined()
		if (!sample) {
			return
		}

		renderWithProviders(<TrustCardResult card={sample.trustCard} />)

		expect(screen.getByText('Pressure tactics')).toBeInTheDocument()
		expect(screen.getByText('Ghost surgery risk')).toBeInTheDocument()
	})
})
