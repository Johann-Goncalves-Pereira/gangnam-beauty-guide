import { Atom } from '@effect-atom/atom-react'

export const selectedSampleAtom = Atom.keepAlive(Atom.make<string | null>(null))
