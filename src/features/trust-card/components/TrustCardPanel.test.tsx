import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TrustCardPanel } from '@features/trust-card/components/TrustCardPanel'

import { renderWithProviders } from '@/test/test-utils'

describe('TrustCardPanel', () => {
	it('renders sample trust card by default', () => {
		renderWithProviders(
			<TrustCardPanel
				sampleId='rhinoplasty-honesty'
				onSampleChange={() => undefined}
			/>,
		)

		expect(screen.getByText('Honesty Plastic Surgery')).toBeInTheDocument()
		expect(screen.getByText(/English translation/i)).toBeInTheDocument()
	})

	it('switches samples when a different review is selected', async () => {
		const user = userEvent.setup()
		const onSampleChange = vi.fn()

		renderWithProviders(
			<TrustCardPanel
				sampleId='rhinoplasty-honesty'
				onSampleChange={onSampleChange}
			/>,
		)

		await user.click(
			screen.getByRole('button', { name: 'Filler — pressure tactics' }),
		)

		expect(onSampleChange).toHaveBeenCalledWith('filler-pressure')
	})
})
