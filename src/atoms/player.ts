import { atom } from 'jotai'

import type { PlayerSrc } from '@vidstack/react'

const volumeAtFifthPercent = 0.5

const playerSourceAtom = atom<PlayerSrc | undefined>(undefined)
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

export { playerSourceAtom, playerMutedAtom, playerVolumeAtom }
