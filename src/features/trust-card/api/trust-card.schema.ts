import { Schema } from 'effect'

export const TrustSignal = Schema.Literal(
	'verified_procedure',
	'surgeon_named',
	'before_after',
	'price_stated',
	'detailed_recovery',
	'language_support',
)
export type TrustSignal = typeof TrustSignal.Type

export const RedFlag = Schema.Literal(
	'ghost_surgery_risk',
	'pressure_tactics',
	'unverifiable_claim',
	'price_mismatch',
	'consultant_substitution',
)
export type RedFlag = typeof RedFlag.Type

export const Sentiment = Schema.Literal('positive', 'mixed', 'negative')
export type Sentiment = typeof Sentiment.Type

export const TrustCardClinic = Schema.Struct({
	displayName: Schema.String.pipe(Schema.minLength(1)),
	aliases: Schema.Array(Schema.String),
})
export type TrustCardClinic = typeof TrustCardClinic.Type

export const TrustCardProcedure = Schema.Struct({
	name: Schema.String.pipe(Schema.minLength(1)),
	category: Schema.String.pipe(Schema.minLength(1)),
})
export type TrustCardProcedure = typeof TrustCardProcedure.Type

export const TrustCard = Schema.Struct({
	sourceText: Schema.String,
	translatedText: Schema.String,
	clinic: TrustCardClinic,
	procedure: TrustCardProcedure,
	surgeonMentioned: Schema.optional(Schema.String),
	trustSignals: Schema.Array(TrustSignal),
	redFlags: Schema.Array(RedFlag),
	sentiment: Sentiment,
	confidence: Schema.Number.pipe(Schema.between(0, 1)),
})
export type TrustCard = typeof TrustCard.Type

export const ExtractReviewRequest = Schema.Struct({
	sourceText: Schema.String.pipe(Schema.minLength(10)),
})
export type ExtractReviewRequest = typeof ExtractReviewRequest.Type

export const ExtractReviewResponse = Schema.Struct({
	trustCard: TrustCard,
})
export type ExtractReviewResponse = typeof ExtractReviewResponse.Type
