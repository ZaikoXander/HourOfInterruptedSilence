import { atom } from 'jotai'
import { atomWithReset, RESET } from 'jotai/utils'
import { atomEffect } from 'jotai-effect'

import formattedTimeAtom from './formattedTimeAtom'

import { ONE_HOUR_IN_SECONDS } from '../../constants'

const timerTotalSecondsAtom = atomWithReset(ONE_HOUR_IN_SECONDS)
const decreaseTimerTotalSecondsAtom = atom(null, (_get, set) => {
  set(
    timerTotalSecondsAtom,
    (previousTimerTotalSeconds) => previousTimerTotalSeconds - 1,
  )
})

const timerIsRunningAtom = atom<boolean>(false)

const startTimerAtom = atom(null, (_get, set) => {
  set(timerIsRunningAtom, true)
})
const pauseTimerAtom = atom(null, (_get, set) => {
  set(timerIsRunningAtom, false)
})
const resetTimerAtom = atom(null, (_get, set) => {
  set(pauseTimerAtom)
  set(timerTotalSecondsAtom, RESET)
})

const timerCanResetAtom = atom<boolean>(
  (get) => get(timerTotalSecondsAtom) < ONE_HOUR_IN_SECONDS,
)

const timeTickingEffect = atomEffect((get, set) => {
  if (get(timerIsRunningAtom) === true) {
    const intervalId = setInterval(
      () => set(decreaseTimerTotalSecondsAtom),
      1000,
    )

    return () => clearInterval(intervalId)
  }
})

export {
  timerTotalSecondsAtom,
  formattedTimeAtom,
  timerIsRunningAtom,
  startTimerAtom,
  pauseTimerAtom,
  resetTimerAtom,
  timerCanResetAtom,
  timeTickingEffect,
}
