import { getRouteApi } from '@tanstack/react-router'

import { TrustCardPanel } from '@features/trust-card'

const routeApi = getRouteApi('/')

function Home() {
	const { sample } = routeApi.useSearch()
	const navigate = routeApi.useNavigate()

	return (
		<TrustCardPanel
			sampleId={sample}
			onSampleChange={nextSample => {
				void navigate({
					search: previous => ({
						...previous,
						sample: nextSample,
					}),
				})
			}}
		/>
	)
}

export default Home
