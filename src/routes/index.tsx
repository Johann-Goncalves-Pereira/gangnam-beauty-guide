import { createFileRoute } from '@tanstack/react-router'

import { parseTrustCardSearch } from '@features/trust-card'

import Home from '@pages/Home'

export const Route = createFileRoute('/')({
	validateSearch: search => parseTrustCardSearch(search),
	component: Home,
})
