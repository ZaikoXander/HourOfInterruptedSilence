import { useTranslation } from 'react-i18next'

import Button from './Button'

interface StartOrPauseTimerButtonProps {
  isRunning: boolean
  canResetTimer: boolean
  canStartPlaying: boolean
  handleStartOrPauseTimer: () => void
}

export default function StartOrPauseTimerButton({
  isRunning,
  canResetTimer,
  canStartPlaying,
  handleStartOrPauseTimer,
}: StartOrPauseTimerButtonProps) {
  const { t } = useTranslation('', { keyPrefix: 'startOrPauseTimerButton' })

  function startOrPauseTimerButtonText() {
    if (isRunning) return t('pauseTimerButtonText')
    if (canResetTimer) return t('resumeTimerButtonText')

    return t('startTimerButtonText')
  }

  return (
    <Button
      className='bg-green-500'
      disabled={!canStartPlaying}
      onClick={handleStartOrPauseTimer}
    >
      {startOrPauseTimerButtonText()}
    </Button>
  )
}
