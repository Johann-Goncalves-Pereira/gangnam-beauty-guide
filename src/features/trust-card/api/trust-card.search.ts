import { Either, Schema } from 'effect'

export const TrustCardSearch = Schema.Struct({
	sample: Schema.optional(Schema.String),
})
export type TrustCardSearch = typeof TrustCardSearch.Type

const defaultSearch = {} satisfies TrustCardSearch

/** Soft-decode URL search; invalid values fall back to `{}`. */
export function parseTrustCardSearch(search: unknown): TrustCardSearch {
	return Either.getOrElse(
		Schema.decodeUnknownEither(TrustCardSearch)(search),
		() => defaultSearch,
	)
}
