import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import {
  playerCanPlayAtom,
  playerDurationAtom,
  playerPausedAtom,
} from '../../../atoms/player/store'
import { pausePlayerAtom, resumePlayerAtom } from '../../../atoms/player/remote'
import {
  timerIsRunningAtom,
  timerCanResetAtom,
  startTimerAtom,
  pauseTimerAtom,
} from '../../../atoms/timer'
import {
  audioMomentsAtom,
  audioMomentShouldUnpauseAtom,
  generateRandomAudioMomentsAtom,
} from '../../../atoms/audioMoments'

import { useTranslation } from 'react-i18next'

import Button from '../../Button'

import cn from '../../../lib/cn'

export default function StartOrPauseTimerButton() {
  const playerPaused = useAtomValue(playerPausedAtom)
  const playerDuration = useAtomValue(playerDurationAtom)
  const playerCanPlay = useAtomValue(playerCanPlayAtom)

  const resumePlayer = useSetAtom(resumePlayerAtom)
  const pausePlayer = useSetAtom(pausePlayerAtom)

  const startTimer = useSetAtom(startTimerAtom)
  const pauseTimer = useSetAtom(pauseTimerAtom)
  const timerIsRunning = useAtomValue(timerIsRunningAtom)
  const timerCanReset = useAtomValue(timerCanResetAtom)

  const [audioMomentShouldUnpause, setAudioMomentShouldUnpause] = useAtom(
    audioMomentShouldUnpauseAtom,
  )
  const audioMoments = useAtomValue(audioMomentsAtom)
  const generateRandomAudioMoments = useSetAtom(generateRandomAudioMomentsAtom)

  const { t, i18n } = useTranslation('', {
    keyPrefix: 'startOrPauseTimerButton',
  })

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

  function handleStartTimer(): void {
    startTimer()
    if (playerPaused && audioMomentShouldUnpause) {
      resumePlayer()
      setAudioMomentShouldUnpause(false)
    }
  }

  function handlePauseTimer(): void {
    pauseTimer()
    if (!playerPaused) {
      pausePlayer()
      setAudioMomentShouldUnpause(true)
    }
  }

  function handleClick(): void {
    if (!audioMoments) generateRandomAudioMoments(playerDuration)

    if (timerIsRunning) {
      handlePauseTimer()
    } else {
      handleStartTimer()
    }
  }

  return (
    <Button
      className={cn(
        'bg-green-500 hover:bg-green-600 disabled:hover:bg-green-500',
        getWidthClass(),
      )}
      disabled={!playerCanPlay}
      onClick={handleClick}
    >
      {timerIsRunning
        ? t('pauseTimerButtonText')
        : timerCanReset
          ? t('resumeTimerButtonText')
          : t('startTimerButtonText')}
    </Button>
  )
}
