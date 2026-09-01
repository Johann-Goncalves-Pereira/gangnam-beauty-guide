import { useMutation } from '@tanstack/react-query'

import { extractReviewPromise } from '@features/trust-card/api/trust-card.api'
import { trustCardKeys } from '@features/trust-card/api/trust-card.query-keys'

export function useExtractReviewMutation() {
	return useMutation({
		mutationKey: trustCardKeys.extract(),
		mutationFn: ({
			sourceText,
			signal,
		}: {
			sourceText: string
			signal?: AbortSignal
		}) => extractReviewPromise(sourceText, signal),
	})
}
