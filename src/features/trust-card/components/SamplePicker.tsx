import type { ReviewSample } from '@features/trust-card/data/review-samples'

import { Button } from '@components/ui/Button'

interface SamplePickerProps {
	readonly samples: readonly ReviewSample[]
	readonly activeSampleId: string
	readonly onSelect: (sampleId: string) => void
}

export function SamplePicker({
	samples,
	activeSampleId,
	onSelect,
}: SamplePickerProps) {
	return (
		<div className='space-y-2'>
			<p className='text-paper-muted text-xs tracking-wide uppercase'>
				Sample reviews
			</p>
			<div className='flex flex-wrap gap-2'>
				{samples.map(sample => {
					const isActive = sample.id === activeSampleId
					return (
						<Button
							key={sample.id}
							variant={isActive ? 'jade' : 'ghost'}
							className='text-left'
							aria-pressed={isActive}
							onClick={() => {
								onSelect(sample.id)
							}}
						>
							{sample.label}
						</Button>
					)
				})}
			</div>
		</div>
	)
}
