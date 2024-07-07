import { atom } from 'jotai'

import { playerAtom } from '.'

import { useMediaStore, type MediaState } from '@vidstack/react'

const storeAtom = atom<Readonly<MediaState>>((get) =>
  useMediaStore(get(playerAtom)),
)
const playerPausedAtom = atom((get) => get(storeAtom).paused)
const playerDurationAtom = atom((get) => get(storeAtom).duration)
const playerCanPlayAtom = atom((get) => get(storeAtom).canPlay)
const playerCurrentTimeAtom = atom((get) => get(storeAtom).currentTime)

export {
  playerPausedAtom,
  playerDurationAtom,
  playerCanPlayAtom,
  playerCurrentTimeAtom,
}
