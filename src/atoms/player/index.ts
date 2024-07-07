import type { RefObject } from 'react'

import { atom } from 'jotai'

import { storeAtom } from './store'

import type { MediaPlayerInstance } from '@vidstack/react'

const volumeAtFifthPercent = 0.5

const playerAtom = atom<RefObject<MediaPlayerInstance> | undefined>(undefined)
const playerSourceAtom = atom<string | File>('')
const playerMutedAtom = atom<boolean>(false)
const playerVolumeAtom = atom(
  volumeAtFifthPercent,
  (get, set, newVolume: number) => {
    if (newVolume === 0) {
      set(playerMutedAtom, true)
      set(playerVolumeAtom, volumeAtFifthPercent)

      return
    }

    if (get(playerMutedAtom)) set(playerMutedAtom, false)
    set(playerVolumeAtom, newVolume)
  },
)

export {
  playerAtom,
  playerSourceAtom,
  playerMutedAtom,
  playerVolumeAtom,
  storeAtom,
}
