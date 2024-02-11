import { atom } from 'jotai'
import { atomWithReset, RESET } from 'jotai/utils'
import { atomEffect } from 'jotai-effect'

import TimeLeft from '../classes/timeLeft'

import { ONE_HOUR_IN_SECONDS } from '../constants'

const initialTimeLeft = new TimeLeft(ONE_HOUR_IN_SECONDS)

export const timeLeftAtom = atomWithReset<TimeLeft>(initialTimeLeft)

export const timerIsRunningAtom = atom<boolean>(false)

export const startTimerAtom = atom(null, (_get, set) => {
  set(timerIsRunningAtom, true)
})
export const pauseTimerAtom = atom(null, (_get, set) => {
  set(timerIsRunningAtom, false)
})
export const resetTimerAtom = atom(null, (_get, set) => {
  set(pauseTimerAtom)
  set(timeLeftAtom, RESET)
})

export const timerCanResetAtom = atom<boolean>(
  (get) => get(timeLeftAtom).getTotalSeconds() < ONE_HOUR_IN_SECONDS,
)

export const timeTickingEffect = atomEffect((get, set) => {
  if (get(timerIsRunningAtom) === true) {
    const intervalId = setInterval(() => {
      set(
        timeLeftAtom,
        (previousTimeLeft) =>
          new TimeLeft(previousTimeLeft.getTotalSeconds() - 1),
      )
    }, 1000)

    return () => clearInterval(intervalId)
  }
})
