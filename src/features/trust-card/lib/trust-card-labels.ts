import {
	type RedFlag,
	type Sentiment,
	type TrustSignal,
} from '@features/trust-card/api/trust-card.schema'

export const trustSignalLabels = {
	verified_procedure: 'Verified procedure',
	surgeon_named: 'Surgeon named',
	before_after: 'Before/after shown',
	price_stated: 'Price stated',
	detailed_recovery: 'Recovery timeline',
	language_support: 'Language support',
} satisfies Record<TrustSignal, string>

export const redFlagLabels = {
	ghost_surgery_risk: 'Ghost surgery risk',
	pressure_tactics: 'Pressure tactics',
	unverifiable_claim: 'Unverifiable claim',
	price_mismatch: 'Price mismatch',
	consultant_substitution: 'Consultant substitution',
} satisfies Record<RedFlag, string>

export const sentimentLabels = {
	positive: 'Positive',
	mixed: 'Mixed',
	negative: 'Negative',
} satisfies Record<Sentiment, string>

export function formatConfidence(confidence: number): string {
	return `${Math.round(confidence * 100)}%`
}
