import { atom } from 'jotai'

const audioMomentsAtom = atom<number[] | null>(null)
const audioMomentShouldUnpauseAtom = atom<boolean>(false)

export { audioMomentsAtom, audioMomentShouldUnpauseAtom }
