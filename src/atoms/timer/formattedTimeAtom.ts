import { atom } from 'jotai'

import { timerTotalSecondsAtom } from '.'

import { ONE_HOUR_IN_SECONDS } from '../../constants'

const ONE_MINUTE_IN_SECONDS = 60

function getHoursDigit(totalSeconds: number): number {
  return Math.floor(totalSeconds / ONE_HOUR_IN_SECONDS)
}

function getMinutesDigit(totalSeconds: number): number {
  return Math.floor(
    (totalSeconds % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS,
  )
}

function getSecondsDigit(totalSeconds: number): number {
  return totalSeconds % ONE_MINUTE_IN_SECONDS
}

const TIMER_FORMAT_LENGTH = 2
const TIMER_FORMAT_PADDING = '0'

function formatDigit(digit: number): string {
  return digit.toString().padStart(TIMER_FORMAT_LENGTH, TIMER_FORMAT_PADDING)
}

const formattedTimeAtom = atom<string>((get) => {
  const timerTotalSeconds = get(timerTotalSecondsAtom)

  const hoursDigit = getHoursDigit(timerTotalSeconds)
  const minutesDigit = getMinutesDigit(timerTotalSeconds)
  const secondsDigit = getSecondsDigit(timerTotalSeconds)

  return [hoursDigit, minutesDigit, secondsDigit].map(formatDigit).join(':')
})

export default formattedTimeAtom
