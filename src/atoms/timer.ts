import { atom } from 'jotai'
import { atomWithReset, RESET } from 'jotai/utils'
import { atomEffect } from 'jotai-effect'

import { ONE_HOUR_IN_SECONDS } from '../constants'

const ONE_MINUTE_IN_SECONDS = 60

const timerTotalSecondsAtom = atomWithReset(ONE_HOUR_IN_SECONDS)
const decreaseTimerTotalSecondsAtom = atom(null, (_get, set) => {
  set(
    timerTotalSecondsAtom,
    (previousTimerTotalSeconds) => previousTimerTotalSeconds - 1,
  )
})
const timerHoursAtom = atom((get) =>
  Math.floor(get(timerTotalSecondsAtom) / ONE_HOUR_IN_SECONDS),
)
const timerMinutesAtom = atom((get) =>
  Math.floor(
    (get(timerTotalSecondsAtom) % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS,
  ),
)
const timerSecondsAtom = atom(
  (get) => get(timerTotalSecondsAtom) % ONE_MINUTE_IN_SECONDS,
)

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
  timerHoursAtom,
  timerMinutesAtom,
  timerSecondsAtom,
  timerIsRunningAtom,
  startTimerAtom,
  pauseTimerAtom,
  resetTimerAtom,
  timerCanResetAtom,
  timeTickingEffect,
}
