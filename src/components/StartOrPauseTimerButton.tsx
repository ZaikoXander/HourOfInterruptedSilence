import { useAtomValue } from 'jotai'
import { timerIsRunningAtom, timerCanResetAtom } from '../atoms/timer'

import { useTranslation } from 'react-i18next'

import cn from '../lib/cn'

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

  const { t, i18n } = useTranslation('', {
    keyPrefix: 'startOrPauseTimerButton',
  })

  function startOrPauseTimerButtonText() {
    if (timerIsRunning) return t('pauseTimerButtonText')
    if (timerCanReset) return t('resumeTimerButtonText')

    return t('startTimerButtonText')
  }

  type LanguagesAbbreviations = 'en' | 'pt-BR' | 'pt'

  const widthMapping: { [key in LanguagesAbbreviations]: number } = {
    en: timerIsRunning ? 28 : timerCanReset ? 32 : 24,
    'pt-BR': timerIsRunning ? 32 : 40,
    pt: timerIsRunning ? 32 : 40,
  }

  function getWidthClass(): string {
    const width =
      widthMapping[i18n.language as LanguagesAbbreviations] ||
      (timerIsRunning ? 28 : timerCanReset ? 32 : 24)

    return `w-${width}`
  }

  return (
    <Button
      className={cn(
        'bg-green-500 transition-all hover:bg-green-600',
        'disabled:hover:bg-green-500',
        getWidthClass(),
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {startOrPauseTimerButtonText()}
    </Button>
  )
}
