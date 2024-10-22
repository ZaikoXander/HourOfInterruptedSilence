import StartOrPauseTimerButton from './StartOrPauseTimerButton'
import ResetTimerButton from './ResetTimerButton'

export default function TimerControlButtons() {
  return (
    <div className='flex gap-4'>
      <StartOrPauseTimerButton />
      <ResetTimerButton />
    </div>
  )
}
