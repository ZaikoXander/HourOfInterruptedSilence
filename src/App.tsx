import { useCallback, useEffect, useRef, useState } from 'react'

import '@vidstack/react/player/styles/base.css'
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore, useMediaRemote } from '@vidstack/react'

import { Timer, AudioOrVideoSourceInput, StartOrPauseTimerButton, Button } from './components'

import useTimer from './hooks/useTimer'

import { useTranslation } from 'react-i18next'

import OneHourRandomAudioMomentsGenerator from './classes/oneHourRandomAudioMomentsGenerator'

import { FaGithub } from 'react-icons/fa'

import { ONE_HOUR_IN_SECONDS } from './constants'

export default function App() {
  const player = useRef<MediaPlayerInstance>(null)
  const remote = useMediaRemote(player)
  const {
    paused: playerPaused,
    currentTime: playerCurrentTime,
    duration: playerDuration,
    canPlay: playerCanPlay,
  } = useMediaStore(player)

  const [audioMoments, setAudioMoments] = useState<number[] | null>()
  const [playerSource, setPlayerSource] = useState<string | File>('')
  const [audioShouldUnpause, setAudioShouldUnpause] = useState<boolean>(false)
  
  const { timeLeft, start, pause, reset, isRunning } = useTimer(ONE_HOUR_IN_SECONDS)
  const canResetTimer = timeLeft.getTotalSeconds() < ONE_HOUR_IN_SECONDS

  const { t, i18n } = useTranslation('', { keyPrefix: 'app' })

  const playAudio = useCallback(() => remote.play(), [remote])
  const pauseAudio = useCallback(() => remote.pause(), [remote])

  function handleAudioOrVideoSourceInputChange(input: string | File): void {
    reset()
    if (playerSource !== '') {
      setAudioMoments(null)
      pauseAudio()
      remote.seek(0)
    }
    setPlayerSource(input)
  }

  async function resetAudio(): Promise<void> {
    const playerReset = playerPaused && playerCurrentTime === 0
    if (!playerReset) {
      pauseAudio()
      remote.seek(0)
      if (playerSource instanceof File) {
        await new Promise((resolve) => {
          setPlayerSource('')
          resolve(true)
        })
        setPlayerSource(playerSource)
      }
    }
  }
  
  function handleRandomAudioMomentsGeneration(): void {
    const oneHourRandomAudioMomentsGenerator = new OneHourRandomAudioMomentsGenerator(playerDuration)
    const generatedRandomAudioMoments = oneHourRandomAudioMomentsGenerator.execute()

    setAudioMoments(generatedRandomAudioMoments)
  }

  function handleStartTimer(): void {
    start()
    if (playerPaused) {
      if (audioShouldUnpause) {
        playAudio()
        setAudioShouldUnpause(false)
      }
    }
  }

  function handlePauseTimer(): void {
    pause()
    if (!playerPaused) {
      pauseAudio()
      setAudioShouldUnpause(true)
    }
  }

  function handleStartOrPauseTimerButtonClick(): void {
    if (!audioMoments) handleRandomAudioMomentsGeneration()

    if (isRunning) {
      handlePauseTimer()
      return
    }

    handleStartTimer()
  }

  function handleResetTimerButtonClick(): void {
    reset()

    if (playerCurrentTime > 0) {
      resetAudio()
      setAudioMoments(null)
    }
  }

  useEffect(() => {
    function handleAudioMoments() {
      if (!audioMoments) return

      const nextMoment = audioMoments[0]
      const secondsToNextMoment = ONE_HOUR_IN_SECONDS - nextMoment
      const audioShouldPlay = timeLeft.getTotalSeconds() === secondsToNextMoment

      if (audioShouldPlay) {
        playAudio()
        
        const updatedAudioMoments = audioMoments.slice(1)
        setAudioMoments(updatedAudioMoments)
      }
    }

    handleAudioMoments()
  }, [audioMoments, playAudio, timeLeft])

  useEffect(() => {
    document.title = t('pageTitle')
    document.documentElement.lang = i18n.language
  }, [t, i18n.language])

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#FFD700] pb-32 gap-40">
      <h1 className="text-6xl text-[#333333] font-[Baloo] font-bold drop-shadow shadow-black">
        {t('title')}
      </h1>
      <section className="flex flex-col items-center gap-12">
        <Timer className='mb-10' timeLeft={timeLeft} />
        <AudioOrVideoSourceInput onChange={handleAudioOrVideoSourceInputChange} />
        <div className="flex gap-4">
          <StartOrPauseTimerButton
            isRunning={isRunning}
            canResetTimer={canResetTimer}
            canStartPlaying={playerCanPlay}
            handleStartOrPauseTimer={handleStartOrPauseTimerButtonClick}
          />
          <Button
            className="bg-red-500"
            disabled={!canResetTimer}
            onClick={handleResetTimerButtonClick}
          >
            {t('resetButton')}
          </Button>
        </div>
      </section>
      <div className='absolute bottom-0 opacity-0 -z-50'>
        <MediaPlayer
          src={playerSource}
          ref={player}
          onEnd={resetAudio}
        >
          <MediaProvider />
        </MediaPlayer>
      </div>
      <a
        className='absolute top-4 right-5'
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ZaikoXander/HoraDeSilencioInterrompido"
      >
        <FaGithub size={40} />
      </a>
    </main>
  )
}
