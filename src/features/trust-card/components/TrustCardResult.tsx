import type { RefObject } from 'react'

import type { TrustCard } from '@features/trust-card/api/trust-card.schema'
import {
	formatConfidence,
	redFlagLabels,
	sentimentLabels,
	trustSignalLabels,
} from '@features/trust-card/lib/trust-card-labels'

interface TrustCardResultProps {
	readonly card: TrustCard
	readonly resultRef?: RefObject<HTMLElement | null>
}

export function TrustCardResult({ card, resultRef }: TrustCardResultProps) {
	return (
		<article
			ref={resultRef}
			className='animate-card-in border-jade/25 bg-ink/60 space-y-6 rounded-xl border p-6 backdrop-blur-sm'
			aria-live='polite'
		>
			<header className='space-y-2'>
				<p className='text-jade text-xs font-medium tracking-widest uppercase'>
					Trust Card
				</p>
				<h3 className='font-display text-paper text-2xl font-medium'>
					{card.clinic.displayName}
				</h3>
				{card.clinic.aliases.length > 0 ? (
					<p className='text-paper-muted text-sm'>
						Also known as: {card.clinic.aliases.join(', ')}
					</p>
				) : null}
			</header>

			<div className='grid gap-4 sm:grid-cols-2'>
				<div>
					<p className='text-paper-muted text-xs tracking-wide uppercase'>
						Procedure
					</p>
					<p className='text-paper font-medium'>{card.procedure.name}</p>
					<p className='text-paper-muted text-sm capitalize'>
						{card.procedure.category}
					</p>
				</div>
				<div>
					<p className='text-paper-muted text-xs tracking-wide uppercase'>
						Sentiment
					</p>
					<p className='text-paper font-medium'>
						{sentimentLabels[card.sentiment]}
					</p>
					<p className='text-paper-muted text-sm'>
						Confidence: {formatConfidence(card.confidence)}
					</p>
				</div>
			</div>

			{card.surgeonMentioned ? (
				<div>
					<p className='text-paper-muted text-xs tracking-wide uppercase'>
						Surgeon mentioned
					</p>
					<p className='text-paper'>{card.surgeonMentioned}</p>
				</div>
			) : null}

			<div>
				<p className='text-paper-muted mb-2 text-xs tracking-wide uppercase'>
					English translation
				</p>
				<p className='text-paper/90 leading-relaxed'>{card.translatedText}</p>
			</div>

			{card.trustSignals.length > 0 ? (
				<div>
					<p className='text-paper-muted mb-2 text-xs tracking-wide uppercase'>
						Trust signals
					</p>
					<ul className='flex flex-wrap gap-2'>
						{card.trustSignals.map((signal, index) => (
							<li
								key={signal}
								className='animate-chip-in border-jade/40 bg-jade/10 text-jade rounded-md border px-2.5 py-1 text-xs font-medium'
								style={{ animationDelay: `${index * 60}ms` }}
							>
								{trustSignalLabels[signal]}
							</li>
						))}
					</ul>
				</div>
			) : null}

			{card.redFlags.length > 0 ? (
				<div>
					<p className='text-paper-muted mb-2 text-xs tracking-wide uppercase'>
						Red flags
					</p>
					<ul className='flex flex-wrap gap-2'>
						{card.redFlags.map((flag, index) => (
							<li
								key={flag}
								className='animate-chip-in border-rose-flag/40 bg-rose-flag/10 text-rose-flag rounded-md border px-2.5 py-1 text-xs font-medium'
								style={{ animationDelay: `${index * 60}ms` }}
							>
								{redFlagLabels[flag]}
							</li>
						))}
					</ul>
				</div>
			) : null}
		</article>
	)
}
