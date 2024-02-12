import { useAtomValue } from 'jotai'
import { timerIsRunningAtom, timerCanResetAtom } from '../atoms/timer'

import { useTranslation } from 'react-i18next'

import Button from './Button'

interface StartOrPauseTimerButtonProps {
  disabled: boolean
  onClick: () => void
}

export default function StartOrPauseTimerButton({
  disabled,
  onClick,
}: StartOrPauseTimerButtonProps) {
  const timerIsRunning = useAtomValue(timerIsRunningAtom)
  const timerCanReset = useAtomValue(timerCanResetAtom)

  const { t } = useTranslation('', { keyPrefix: 'startOrPauseTimerButton' })

  function startOrPauseTimerButtonText() {
    if (timerIsRunning) return t('pauseTimerButtonText')
    if (timerCanReset) return t('resumeTimerButtonText')

    return t('startTimerButtonText')
  }

  return (
    <Button className='bg-green-500' disabled={disabled} onClick={onClick}>
      {startOrPauseTimerButtonText()}
    </Button>
  )
}
