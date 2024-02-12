import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

const audioMomentsAtom = atomWithReset<number[] | null>(null)
const audioMomentShouldUnpauseAtom = atom<boolean>(false)

export { audioMomentsAtom, audioMomentShouldUnpauseAtom }
