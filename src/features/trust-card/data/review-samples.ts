import type { TrustCard } from '@features/trust-card/api/trust-card.schema'

export interface ReviewSample {
	readonly id: string
	readonly label: string
	readonly sourceText: string
	readonly trustCard: TrustCard
}

export const reviewSamples = [
	{
		id: 'rhinoplasty-honesty',
		label: 'Rhinoplasty — Honesty PS',
		sourceText:
			'코성형 받았는데 정말 만족해요. 원장님이 직접 상담해주시고 수술도 본인이 하신다고 했어요. ' +
			'수술 전후 사진도 보여주셨고 가격은 450만원이었습니다. 회복은 2주 정도 걸렸고 붓기는 예상보다 적었어요. ' +
			'외국인 환자를 위한 영어 통역 서비스도 있어서 편했습니다.',
		trustCard: {
			sourceText:
				'코성형 받았는데 정말 만족해요. 원장님이 직접 상담해주시고 수술도 본인이 하신다고 했어요. ' +
				'수술 전후 사진도 보여주셨고 가격은 450만원이었습니다. 회복은 2주 정도 걸렸고 붓기는 예상보다 적었어요. ' +
				'외국인 환자를 위한 영어 통역 서비스도 있어서 편했습니다.',
			translatedText:
				'I had rhinoplasty and I am very satisfied. The director personally consulted with me and said he would perform the surgery himself. ' +
				'They showed before/after photos and the price was 4.5 million KRW. Recovery took about two weeks and swelling was less than expected. ' +
				'English interpretation for foreign patients was available, which was convenient.',
			clinic: {
				displayName: 'Honesty Plastic Surgery',
				aliases: ['어니스트성형외과', 'Honesty PS'],
			},
			procedure: {
				name: 'Rhinoplasty',
				category: 'nose',
			},
			surgeonMentioned: 'Director (원장님)',
			trustSignals: [
				'surgeon_named',
				'before_after',
				'price_stated',
				'detailed_recovery',
				'language_support',
				'verified_procedure',
			],
			redFlags: [],
			sentiment: 'positive',
			confidence: 0.91,
		},
	},
	{
		id: 'filler-pressure',
		label: 'Filler — pressure tactics',
		sourceText:
			'필러 맞으러 갔는데 상담실장이 계속 더 비싼 시술 권유했어요. 원장님은 안 보이고 시술도 누가 했는지 모르겠어요. ' +
			'가격도 처음 말한 것보다 30만원 더 나왔습니다. 효과는 그냥 그랬어요.',
		trustCard: {
			sourceText:
				'필러 맞으러 갔는데 상담실장이 계속 더 비싼 시술 권유했어요. 원장님은 안 보이고 시술도 누가 했는지 모르겠어요. ' +
				'가격도 처음 말한 것보다 30만원 더 나왔습니다. 효과는 그냥 그랬어요.',
			translatedText:
				'I went for filler but the consultant kept pushing more expensive treatments. I never saw the director and I am not sure who performed the procedure. ' +
				'The final price was 300,000 KRW more than initially quoted. Results were mediocre.',
			clinic: {
				displayName: 'Unknown clinic',
				aliases: [],
			},
			procedure: {
				name: 'Filler',
				category: 'injectable',
			},
			trustSignals: [],
			redFlags: [
				'pressure_tactics',
				'ghost_surgery_risk',
				'price_mismatch',
				'consultant_substitution',
			],
			sentiment: 'negative',
			confidence: 0.88,
		},
	},
	{
		id: 'double-eyelid-sketch',
		label: 'Double eyelid — Sketch PS',
		sourceText:
			'쌍꺼풀 수술 받았습니다. 스케치성형외과에서 했고 담당 원장님 성함도 알려주셨어요. ' +
			'수술실 CCTV 있다고 안내해주셨고, 회복 기간 1주일 정도라고 설명해주셨습니다. 자연스럽게 잘 됐어요.',
		trustCard: {
			sourceText:
				'쌍꺼풀 수술 받았습니다. 스케치성형외과에서 했고 담당 원장님 성함도 알려주셨어요. ' +
				'수술실 CCTV 있다고 안내해주셨고, 회복 기간 1주일 정도라고 설명해주셨습니다. 자연스럽게 잘 됐어요.',
			translatedText:
				"I had double eyelid surgery at Sketch Plastic Surgery. They told me the attending director's name. " +
				'They informed me about OR CCTV and explained recovery would be about one week. Results look natural.',
			clinic: {
				displayName: 'Sketch Plastic Surgery',
				aliases: ['스케치성형외과', 'Sketch PS'],
			},
			procedure: {
				name: 'Double eyelid surgery',
				category: 'eyes',
			},
			surgeonMentioned: 'Attending director',
			trustSignals: [
				'surgeon_named',
				'verified_procedure',
				'detailed_recovery',
			],
			redFlags: [],
			sentiment: 'positive',
			confidence: 0.9,
		},
	},
	{
		id: 'laser-unverifiable',
		label: 'Laser — unverifiable claims',
		sourceText:
			'레이저 토닝 받았는데 효과가 세계 최고라고 홍보하더라고요. 전후 사진은 다른 사람 것 같았고 가격은 안 알려줬어요. ' +
			'시술자가 누군지도 확인 못했습니다.',
		trustCard: {
			sourceText:
				'레이저 토닝 받았는데 효과가 세계 최고라고 홍보하더라고요. 전후 사진은 다른 사람 것 같았고 가격은 안 알려줬어요. ' +
				'시술자가 누군지도 확인 못했습니다.',
			translatedText:
				"I had laser toning. They advertised it as world-best results. Before/after photos looked like someone else's and they did not disclose the price. " +
				'I could not verify who performed the treatment.',
			clinic: {
				displayName: 'Unknown clinic',
				aliases: [],
			},
			procedure: {
				name: 'Laser toning',
				category: 'laser',
			},
			trustSignals: [],
			redFlags: ['unverifiable_claim', 'ghost_surgery_risk'],
			sentiment: 'negative',
			confidence: 0.85,
		},
	},
] satisfies readonly ReviewSample[]

export function getSampleById(id: string): ReviewSample | undefined {
	return reviewSamples.find(sample => sample.id === id)
}

export function getDefaultSample(): ReviewSample {
	const first = reviewSamples[0]
	if (!first) {
		throw new Error('No review samples configured')
	}
	return first
}
