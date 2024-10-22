import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import {
  playerAtom,
  playerSourceAtom,
  playerVolumeAtom,
  playerMutedAtom,
} from '../../atoms/player'
import {
  pausePlayerAtom,
  resetPlayerCurrentTimeAtom,
} from '../../atoms/player/remote'
import {
  playerCurrentTimeAtom,
  playerPausedAtom,
} from '../../atoms/player/store'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'

export default function HiddenMediaPlayer() {
  const player = useAtomValue(playerAtom)
  const [playerSource, setPlayerSource] = useAtom(playerSourceAtom)
  const playerVolume = useAtomValue(playerVolumeAtom)
  const playerMuted = useAtomValue(playerMutedAtom)

  const pausePlayer = useSetAtom(pausePlayerAtom)
  const resetPlayerCurrentTime = useSetAtom(resetPlayerCurrentTimeAtom)

  const playerPaused = useAtomValue(playerPausedAtom)
  const playerCurrentTime = useAtomValue(playerCurrentTimeAtom)

  async function resetPlayer(): Promise<void> {
    const playerReset = playerPaused && playerCurrentTime === 0

    if (!playerReset) {
      pausePlayer()
      resetPlayerCurrentTime()

      if (playerSource instanceof File) {
        await new Promise((resolve) => {
          setPlayerSource('')
          resolve(true)
        })

        setPlayerSource(playerSource)
      }
    }
  }

  return (
    <div className='absolute bottom-0 -z-50 opacity-0'>
      <MediaPlayer
        src={playerSource}
        ref={player}
        volume={playerVolume}
        muted={playerMuted}
        onEnd={resetPlayer}
      >
        <MediaProvider />
      </MediaPlayer>
    </div>
  )
}
