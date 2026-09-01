import { useEffectEvent, useRef } from 'react'

import { ReviewInput } from '@features/trust-card/components/ReviewInput'
import { SamplePicker } from '@features/trust-card/components/SamplePicker'
import { TrustCardHero } from '@features/trust-card/components/TrustCardHero'
import { TrustCardResult } from '@features/trust-card/components/TrustCardResult'
import { useTrustCardPage } from '@features/trust-card/hooks/useTrustCardPage'

interface TrustCardPanelProps {
	readonly sampleId?: string | undefined
	readonly onSampleChange: (sampleId: string | undefined) => void
}

export function TrustCardPanel({
	sampleId,
	onSampleChange,
}: TrustCardPanelProps) {
	const toolRef = useRef<HTMLElement>(null)
	const {
		samples,
		activeSample,
		activeCard,
		customText,
		setCustomText,
		selectSample,
		extractCustomReview,
		isExtracting,
		extractError,
		resultRef,
	} = useTrustCardPage({ sampleId, onSampleChange })

	const scrollToTool = useEffectEvent(() => {
		toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	})

	return (
		<div className='min-h-dvh'>
			<TrustCardHero onTrySamples={scrollToTool} />

			<section
				ref={toolRef}
				id='trust-card-tool'
				className='border-paper-muted/10 border-t px-6 py-16 sm:px-10'
			>
				<div className='mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.1fr]'>
					<div className='space-y-8'>
						<div>
							<h2 className='font-display text-paper text-2xl font-medium'>
								Review Trust Card
							</h2>
							<p className='text-paper-muted mt-2 text-sm leading-relaxed'>
								Syndicate → translate → normalise clinic names → extract trust
								signals. This MVP demos the core moat for Western
								medical-tourism buyers.
							</p>
						</div>

						<SamplePicker
							samples={samples}
							activeSampleId={activeSample.id}
							onSelect={selectSample}
						/>

						<ReviewInput
							value={customText}
							onChange={setCustomText}
							onExtract={extractCustomReview}
							isExtracting={isExtracting}
							errorMessage={extractError}
						/>
					</div>

					{activeCard ? (
						<TrustCardResult card={activeCard} resultRef={resultRef} />
					) : null}
				</div>
			</section>

			<footer className='border-paper-muted/10 text-paper-muted border-t px-6 py-8 text-center text-xs sm:px-10'>
				<p>
					MVP artifact for{' '}
					<a
						href='https://gangnambeautyguide.com'
						className='text-jade hover:underline'
						target='_blank'
						rel='noopener noreferrer'
					>
						Gangnam Beauty Guide
					</a>
					. Not affiliated with the production site.
				</p>
			</footer>
		</div>
	)
}
