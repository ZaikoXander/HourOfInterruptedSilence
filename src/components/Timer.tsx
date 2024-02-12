import { useAtomValue } from 'jotai'
import {
  timerHoursAtom,
  timerMinutesAtom,
  timerSecondsAtom,
} from '../atoms/timer'

import cn from '../lib/cn'

const TIMER_FORMAT_LENGTH = 2
const TIMER_FORMAT_PADDING = '0'

function formatDigit(digit: number): string {
  return digit.toString().padStart(TIMER_FORMAT_LENGTH, TIMER_FORMAT_PADDING)
}

interface TimerProps {
  className?: string
}

export default function Timer({ className }: TimerProps) {
  const timerHours = useAtomValue(timerHoursAtom)
  const timerMinutes = useAtomValue(timerMinutesAtom)
  const timerSeconds = useAtomValue(timerSecondsAtom)

  function formatTime(): string {
    const digits: number[] = [timerHours, timerMinutes, timerSeconds]

    return digits.map(formatDigit).join(':')
  }

  return (
    <time
      className={cn(
        'flex w-60 justify-center rounded bg-black px-4 py-3 font-[Inter]',
        'text-5xl text-[#FFA500] shadow shadow-black',
        className,
      )}
    >
      {formatTime()}
    </time>
  )
}
