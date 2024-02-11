import { atom } from 'jotai'
import { atomWithReset, RESET } from 'jotai/utils'
import { atomEffect } from 'jotai-effect'

import TimeLeft from '../classes/timeLeft'

import { ONE_HOUR_IN_SECONDS } from '../constants'

const initialTimeLeft = new TimeLeft(ONE_HOUR_IN_SECONDS)

const timeLeftAtom = atomWithReset<TimeLeft>(initialTimeLeft)

const timerIsRunningAtom = atom<boolean>(false)

const startTimerAtom = atom(null, (_get, set) => {
  set(timerIsRunningAtom, true)
})
const pauseTimerAtom = atom(null, (_get, set) => {
  set(timerIsRunningAtom, false)
})
const resetTimerAtom = atom(null, (_get, set) => {
  set(pauseTimerAtom)
  set(timeLeftAtom, RESET)
})

const timerCanResetAtom = atom<boolean>(
  (get) => get(timeLeftAtom).getTotalSeconds() < ONE_HOUR_IN_SECONDS,
)

const timeTickingEffect = atomEffect((get, set) => {
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

export {
  timeLeftAtom,
  timerIsRunningAtom,
  startTimerAtom,
  pauseTimerAtom,
  resetTimerAtom,
  timerCanResetAtom,
  timeTickingEffect,
}
