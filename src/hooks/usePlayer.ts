import { useRef, useState } from 'react'

import {
  useMediaRemote,
  useMediaStore,
  type MediaPlayerInstance,
} from '@vidstack/react'

const volumeAtFifthPercent = 0.5

export default function usePlayer() {
  const player = useRef<MediaPlayerInstance>(null)
  const remote = useMediaRemote(player)

  const { paused, currentTime, duration, canPlay } = useMediaStore(player)

  const [playerSource, setPlayerSource] = useState<string | File>('')
  const [playerVolume, setPlayerVolume] = useState<number>(volumeAtFifthPercent)
  const [playerMuted, setPlayerMuted] = useState<boolean>(false)

  function changePlayerVolume(volume: number) {
    if (volume === 0) {
      setPlayerMuted(true)
      setPlayerVolume(volumeAtFifthPercent)

      return
    }

    if (playerMuted) setPlayerMuted(false)

    setPlayerVolume(volume)
  }

  const pausePlayer = () => remote.pause()
  const resetPlayerCurrentTime = () => remote.seek(0)

  async function resetPlayer(): Promise<void> {
    const playerReset = paused && currentTime === 0
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

  return {
    player,
    playerPaused: paused,
    playerCurrentTime: currentTime,
    playerDuration: duration,
    playerCanPlay: canPlay,
    playerVolume,
    changePlayerVolume,
    playerMuted,
    setPlayerMuted,
    playerSource,
    setPlayerSource,
    resumePlayer: () => remote.play(),
    pausePlayer,
    resetPlayerCurrentTime,
    resetPlayer,
  }
}
