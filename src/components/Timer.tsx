import { useAtomValue } from 'jotai'
import { timeLeftAtom } from '../atoms/timer'

import cn from '../lib/cn'

const TIMER_FORMAT_LENGTH = 2
const TIMER_FORMAT_PADDING = '0'

interface TimerProps {
  className?: string
}

export default function Timer({ className }: TimerProps) {
  const timeLeft = useAtomValue(timeLeftAtom)

  function formatDigit(digit: number): string {
    const stringDigit: string = digit.toString()

    return stringDigit.padStart(TIMER_FORMAT_LENGTH, TIMER_FORMAT_PADDING)
  }

  function formatDigits(digits: number[]): string[] {
    return digits.map(formatDigit)
  }

  function formatTime(): string {
    const digits: number[] = [
      timeLeft.getHours(),
      timeLeft.getMinutes(),
      timeLeft.getSeconds(),
    ]
    const formattedDigits: string[] = formatDigits(digits)

    return formattedDigits.join(':')
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
