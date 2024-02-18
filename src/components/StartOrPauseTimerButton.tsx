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

  const width24 = 'w-24'
  const width28 = 'w-28'
  const width32 = 'w-32'
  const width40 = 'w-40'

  const widthMapping: { [key in LanguagesAbbreviations]: string } = {
    en: timerIsRunning ? width28 : timerCanReset ? width32 : width24,
    'pt-BR': timerIsRunning ? width32 : width40,
    pt: timerIsRunning ? width32 : width40,
  }

  function getWidthClass(): string | undefined {
    return (
      widthMapping[i18n.language as LanguagesAbbreviations] ||
      (timerIsRunning ? width28 : timerCanReset ? width32 : width24)
    )
  }

  return (
    <Button
      className={cn(
        'bg-green-500 hover:bg-green-600 disabled:hover:bg-green-500',
        getWidthClass(),
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {startOrPauseTimerButtonText()}
    </Button>
  )
}
