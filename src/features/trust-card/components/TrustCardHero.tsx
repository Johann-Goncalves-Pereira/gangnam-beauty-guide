interface TrustCardHeroProps {
	readonly onTrySamples: () => void
}

export function TrustCardHero({ onTrySamples }: TrustCardHeroProps) {
	return (
		<section className='animate-fade-up relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28'>
			<div
				className='pointer-events-none absolute inset-0 opacity-40'
				aria-hidden='true'
				style={{
					background:
						'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61, 170, 140, 0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(61, 170, 140, 0.08) 0%, transparent 50%)',
				}}
			/>
			<div className='relative mx-auto max-w-3xl text-center'>
				<p className='text-jade mb-4 text-sm font-medium tracking-[0.2em] uppercase'>
					Gangnam Beauty Guide
				</p>
				<h1 className='font-display text-paper text-4xl leading-tight font-medium sm:text-5xl'>
					Read Korean clinic reviews the way locals do
				</h1>
				<p className='text-paper-muted mx-auto mt-4 max-w-xl text-lg'>
					Translate, normalise, and surface trust signals — so you can compare
					clinics before you fly to Seoul.
				</p>
				<button
					type='button'
					onClick={onTrySamples}
					className='bg-jade hover:bg-jade-muted focus-visible:ring-jade/50 mt-8 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] focus-visible:outline-none'
				>
					Try a sample review
				</button>
			</div>
		</section>
	)
}
