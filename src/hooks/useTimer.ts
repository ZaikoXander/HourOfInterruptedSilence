import { useState, useEffect } from 'react'

import TimeLeft from '../classes/timeLeft'

export default function useTimer(initialSeconds: number) {
  const initialTimeLeft = new TimeLeft(initialSeconds)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => new TimeLeft(prevTimeLeft.getTotalSeconds() - 1))
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [isRunning])

  const start = () => setIsRunning(true)
  const startOrPause = () => setIsRunning((prevIsRunning) => !prevIsRunning)
  const pause = () => setIsRunning(false)
  const reset = () => {
    pause()
    setTimeLeft(initialTimeLeft)
  }

  return { timeLeft, start, startOrPause, pause, reset, isRunning }
}
