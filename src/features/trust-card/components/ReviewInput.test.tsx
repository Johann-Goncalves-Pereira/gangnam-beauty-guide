import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ReviewInput } from '@features/trust-card/components/ReviewInput'

import { renderWithProviders } from '@/test/test-utils'

describe('ReviewInput', () => {
	it('disables extract until text is long enough', async () => {
		const user = userEvent.setup()
		const onExtract = vi.fn()

		renderWithProviders(
			<ReviewInput
				value=''
				onChange={() => undefined}
				onExtract={onExtract}
				isExtracting={false}
			/>,
		)

		const button = screen.getByRole('button', { name: 'Extract Trust Card' })
		expect(button).toBeDisabled()

		await user.type(
			screen.getByPlaceholderText('한국어 리뷰를 붙여넣으세요…'),
			'짧음',
		)
		expect(button).toBeDisabled()
	})

	it('calls onExtract when text meets minimum length', async () => {
		const user = userEvent.setup()
		const onExtract = vi.fn()

		renderWithProviders(
			<ReviewInput
				value='한국어로 된 충분히 긴 리뷰 텍스트입니다'
				onChange={() => undefined}
				onExtract={onExtract}
				isExtracting={false}
			/>,
		)

		await user.click(screen.getByRole('button', { name: 'Extract Trust Card' }))
		expect(onExtract).toHaveBeenCalledOnce()
	})
})
