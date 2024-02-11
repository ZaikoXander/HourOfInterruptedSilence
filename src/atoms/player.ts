import { atom } from 'jotai'

const volumeAtFifthPercent = 0.5

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

export { playerSourceAtom, playerMutedAtom, playerVolumeAtom }
