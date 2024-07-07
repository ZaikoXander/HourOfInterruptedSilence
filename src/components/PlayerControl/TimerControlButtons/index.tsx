import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'

import { playerSourceAtom } from '../../../atoms/player'
import {
  pausePlayerAtom,
  resetPlayerCurrentTimeAtom,
} from '../../../atoms/player/remote'
import { resetTimerAtom, timerCanResetAtom } from '../../../atoms/timer'
import {
  playerCurrentTimeAtom,
  playerPausedAtom,
} from '../../../atoms/player/store'
import { audioMomentsAtom } from '../../../atoms/audioMoments'

import StartOrPauseTimerButton from './StartOrPauseTimerButton'
import Button from '../../Button'

import { useTranslation } from 'react-i18next'

export default function TimerControlButtons() {
  const [playerSource, setPlayerSource] = useAtom(playerSourceAtom)

  const playerPaused = useAtomValue(playerPausedAtom)
  const playerCurrentTime = useAtomValue(playerCurrentTimeAtom)

  const pausePlayer = useSetAtom(pausePlayerAtom)
  const resetPlayerCurrentTime = useSetAtom(resetPlayerCurrentTimeAtom)

  const timerCanReset = useAtomValue(timerCanResetAtom)
  const resetTimer = useSetAtom(resetTimerAtom)

  const resetAudioMoments = useResetAtom(audioMomentsAtom)

  const { t } = useTranslation('', { keyPrefix: 'app' })

  function playerIsNotReset(): boolean {
    return !(playerPaused && playerCurrentTime === 0)
  }

  function playerSourceIsAFile(): boolean {
    return playerSource instanceof File
  }

  async function resetPlayer(): Promise<void> {
    if (playerIsNotReset()) {
      pausePlayer()
      resetPlayerCurrentTime()

      if (playerSourceIsAFile()) {
        await new Promise((resolve) => {
          setPlayerSource('')
          resolve(true)
        })

        setPlayerSource(playerSource)
      }
    }
  }

  function handleResetTimerButtonClick(): void {
    resetTimer()

    if (playerCurrentTime > 0) {
      resetPlayer()
      resetAudioMoments()
    }
  }

  return (
    <div className='flex gap-4'>
      <StartOrPauseTimerButton />
      <Button
        className='bg-red-500 hover:bg-red-600 disabled:hover:bg-red-500'
        disabled={!timerCanReset}
        onClick={handleResetTimerButtonClick}
      >
        {t('resetButton')}
      </Button>
    </div>
  )
}
