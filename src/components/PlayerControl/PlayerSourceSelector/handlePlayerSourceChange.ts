import { atom } from 'jotai'
import { RESET } from 'jotai/utils'

import { resetTimerAtom } from '../../../atoms/timer'
import { playerSourceAtom } from '../../../atoms/player'
import { audioMomentsAtom } from '../../../atoms/audioMoments'
import {
  pausePlayerAtom,
  resetPlayerCurrentTimeAtom,
} from '../../../atoms/player/remote'

const handlePlayerSourceChangeAtom = atom(
  null,
  (get, set, input: string | File) => {
    set(resetTimerAtom)
    if (get(playerSourceAtom) !== '') {
      set(audioMomentsAtom, RESET)
      set(pausePlayerAtom)
      set(resetPlayerCurrentTimeAtom)
    }

    set(playerSourceAtom, input)
  },
)

export default handlePlayerSourceChangeAtom
