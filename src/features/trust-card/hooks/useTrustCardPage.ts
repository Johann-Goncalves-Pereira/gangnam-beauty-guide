import { useEffect, useRef, useState } from 'react'

import { useAtomValue } from '@effect-atom/atom-react'

import { useExtractReviewMutation } from '@features/trust-card/api/trust-card.queries'
import type { TrustCard } from '@features/trust-card/api/trust-card.schema'
import { selectedSampleAtom } from '@features/trust-card/atoms/trust-card-ui.atom'
import {
	getDefaultSample,
	getSampleById,
	reviewSamples,
} from '@features/trust-card/data/review-samples'

interface UseTrustCardPageOptions {
	readonly sampleId?: string | undefined
	readonly onSampleChange: (sampleId: string | undefined) => void
}

export function useTrustCardPage({
	sampleId,
	onSampleChange,
}: UseTrustCardPageOptions) {
	const selectedFromAtom = useAtomValue(selectedSampleAtom)
	const [customText, setCustomText] = useState('')
	const [activeCard, setActiveCard] = useState<TrustCard | null>(null)
	const [mode, setMode] = useState<'sample' | 'custom'>('sample')
	const resultRef = useRef<HTMLElement | null>(null)

	const extractMutation = useExtractReviewMutation()

	const resolvedSampleId = sampleId ?? selectedFromAtom ?? getDefaultSample().id
	const activeSample = getSampleById(resolvedSampleId) ?? getDefaultSample()

	useEffect(() => {
		if (mode === 'sample') {
			setActiveCard(activeSample.trustCard)
		}
	}, [activeSample, mode])

	function selectSample(nextId: string) {
		setMode('sample')
		onSampleChange(nextId)
		setActiveCard(getSampleById(nextId)?.trustCard ?? null)
	}

	function extractCustomReview() {
		const trimmed = customText.trim()
		if (trimmed.length < 10) {
			return
		}

		setMode('custom')
		extractMutation.mutate(
			{ sourceText: trimmed },
			{
				onSuccess: data => {
					setActiveCard(data.trustCard)
					resultRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
					})
				},
			},
		)
	}

	const extractError =
		extractMutation.error instanceof Error
			? extractMutation.error.message
			: extractMutation.isError
				? 'Extraction failed. Try a sample review or deploy with OPENAI_API_KEY.'
				: undefined

	return {
		samples: reviewSamples,
		activeSample,
		activeCard,
		customText,
		setCustomText,
		selectSample,
		extractCustomReview,
		isExtracting: extractMutation.isPending,
		extractError,
		mode,
		resultRef,
	}
}
