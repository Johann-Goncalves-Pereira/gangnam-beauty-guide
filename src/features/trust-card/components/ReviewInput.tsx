import { Button } from '@components/ui/Button'

interface ReviewInputProps {
	readonly value: string
	readonly onChange: (value: string) => void
	readonly onExtract: () => void
	readonly isExtracting: boolean
	readonly errorMessage?: string | undefined
}

export function ReviewInput({
	value,
	onChange,
	onExtract,
	isExtracting,
	errorMessage,
}: ReviewInputProps) {
	const canExtract = value.trim().length >= 10

	return (
		<div className='space-y-3'>
			<label className='block space-y-2'>
				<span className='text-paper-muted text-xs tracking-wide uppercase'>
					Or paste a Korean review
				</span>
				<textarea
					value={value}
					onChange={event => {
						onChange(event.target.value)
					}}
					rows={4}
					placeholder='한국어 리뷰를 붙여넣으세요…'
					className='border-paper-muted/30 bg-ink/40 text-paper placeholder:text-paper-muted/60 focus:border-jade focus:ring-jade/30 w-full resize-y rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
				/>
			</label>
			<div className='flex flex-wrap items-center gap-3'>
				<Button
					variant='jade'
					disabled={!canExtract || isExtracting}
					onClick={onExtract}
				>
					{isExtracting ? 'Extracting…' : 'Extract Trust Card'}
				</Button>
				<p className='text-paper-muted text-xs'>
					Live extraction requires deployment with OPENAI_API_KEY
				</p>
			</div>
			{errorMessage ? (
				<p className='text-rose-flag text-sm' role='alert'>
					{errorMessage}
				</p>
			) : null}
		</div>
	)
}
