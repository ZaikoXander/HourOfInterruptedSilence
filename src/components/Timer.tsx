import TimeLeft from "../classes/timeLeft"

const TIMER_FORMAT_LENGTH = 2
const TIMER_FORMAT_PADDING = '0'

interface TimerProps {
  timeLeft: TimeLeft
}

export default function Timer({ timeLeft }: TimerProps) {
  function formatDigit(digit: number): string {
    const stringDigit: string = digit.toString()

    return stringDigit.padStart(TIMER_FORMAT_LENGTH, TIMER_FORMAT_PADDING)
  }

  function formatDigits(digits: number[]): string[] {
    return digits.map(formatDigit)
  }

  function formatTime(): string {
    const digits: number[] = [timeLeft.getHours(), timeLeft.getMinutes(), timeLeft.getSeconds()]
    const formattedDigits: string[] = formatDigits(digits)

    return formattedDigits.join(':')
  }

  return (
    <time
      className={
        [
          'w-60 flex justify-center rounded py-3 px-4 bg-black shadow shadow-black mb-10 text-5xl text-[#FFA500]',
          'font-[Inter]'
        ].join(' ')
      }
    >
      {formatTime()}
    </time>
  )
}
