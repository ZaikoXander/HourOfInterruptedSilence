import { useAtom, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'

import { resetTimerAtom } from '../../../atoms/timer'
import { playerSourceAtom } from '../../../atoms/player'
import {
  pausePlayerAtom,
  resetPlayerCurrentTimeAtom,
} from '../../../atoms/player/remote'
import { audioMomentsAtom } from '../../../atoms/audioMoments'

import FileInputButton from './FileInputButton'
import YoutubeVideoUrlInput from './YoutubeVideoUrlInput'

import { useTranslation } from 'react-i18next'

export default function PlayerSourceSelector() {
  const resetTimer = useSetAtom(resetTimerAtom)

  const [playerSource, setPlayerSource] = useAtom(playerSourceAtom)

  const resetAudioMoments = useResetAtom(audioMomentsAtom)

  const pausePlayer = useSetAtom(pausePlayerAtom)
  const resetPlayerCurrentTime = useSetAtom(resetPlayerCurrentTimeAtom)

  function handlePlayerSourceChange(input: string | File): void {
    resetTimer()
    if (playerSource !== '') {
      resetAudioMoments()
      pausePlayer()
      resetPlayerCurrentTime()
    }

    setPlayerSource(input)
  }

  const { t } = useTranslation('', { keyPrefix: 'playerSourceSelector' })

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between gap-4 pr-4'>
        <FileInputButton onChange={handlePlayerSourceChange} />
        <span className='font-[Inter] text-2xl font-semibold'>
          {t('playerSourceSelectorSpan')}
        </span>
      </div>
      <YoutubeVideoUrlInput onChange={handlePlayerSourceChange} />
    </div>
  )
}
