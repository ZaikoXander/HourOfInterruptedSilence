import { useEffect, useState } from 'react'

import cn from './lib/cn'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'

import {
  AudioOrVideoSourceInput,
  Button,
  StartOrPauseTimerButton,
  Timer,
} from './components'

import usePlayer from './hooks/usePlayer'
import useTimer from './hooks/useTimer'

import OneHourRandomAudioMomentsGenerator from './classes/oneHourRandomAudioMomentsGenerator'

import { useTranslation } from 'react-i18next'

import { ONE_HOUR_IN_SECONDS } from './constants'

import { FaGithub, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

export default function App() {
  const {
    player,
    playerPaused,
    playerCurrentTime,
    playerDuration,
    playerCanPlay,
    playerVolume,
    changePlayerVolume,
    playerMuted,
    setPlayerMuted,
    playerSource,
    setPlayerSource,
    resumePlayer,
    pausePlayer,
    resetPlayerCurrentTime,
    resetPlayer,
  } = usePlayer()

  const [audioMoments, setAudioMoments] = useState<number[] | null>()
  const [audioShouldUnpause, setAudioShouldUnpause] = useState<boolean>(false)

  const { timeLeft, start, pause, reset, isRunning } =
    useTimer(ONE_HOUR_IN_SECONDS)
  const canResetTimer = timeLeft.getTotalSeconds() < ONE_HOUR_IN_SECONDS

  const { t, i18n } = useTranslation('', { keyPrefix: 'app' })

  function handleAudioOrVideoSourceInputChange(input: string | File): void {
    reset()
    if (playerSource !== '') {
      setAudioMoments(null)
      pausePlayer()
      resetPlayerCurrentTime()
    }
    setPlayerSource(input)
  }

  function handleRandomAudioMomentsGeneration(): void {
    const oneHourRandomAudioMomentsGenerator =
      new OneHourRandomAudioMomentsGenerator(playerDuration)
    const generatedRandomAudioMoments =
      oneHourRandomAudioMomentsGenerator.execute()

    setAudioMoments(generatedRandomAudioMoments)
  }

  function handleStartTimer(): void {
    start()
    if (playerPaused && audioShouldUnpause) {
      resumePlayer()
      setAudioShouldUnpause(false)
    }
  }

  function handlePauseTimer(): void {
    pause()
    if (!playerPaused) {
      pausePlayer()
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
      resetPlayer()
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
        resumePlayer()

        const updatedAudioMoments = audioMoments.slice(1)
        setAudioMoments(updatedAudioMoments)
      }
    }

    handleAudioMoments()
  }, [audioMoments, resumePlayer, timeLeft])

  useEffect(() => {
    document.title = t('pageTitle')
    document.documentElement.lang = i18n.language
  }, [t, i18n.language])

  return (
    <main
      className={cn(
        'flex h-screen flex-col items-center justify-center gap-40',
        'bg-[#FFD700] pb-32',
      )}
    >
      <h1
        className={cn(
          'font-[Baloo] text-6xl font-bold text-[#333333] shadow-black',
          'drop-shadow',
        )}
      >
        {t('title')}
      </h1>
      <section className='flex flex-col items-center gap-12'>
        <Timer className='mb-10' timeLeft={timeLeft} />
        <div className='flex gap-2 transition-all duration-1000'>
          <button
            type='button'
            onClick={() => setPlayerMuted(!playerMuted)}
            className='transition duration-700 ease-in-out hover:scale-110'
          >
            {playerMuted ? (
              <FaVolumeMute size={24} />
            ) : (
              <FaVolumeUp size={24} />
            )}
          </button>
          <label id='volume-control' className='sr-only'>
            Volume
          </label>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={playerMuted ? 0 : playerVolume}
            onChange={(e) => changePlayerVolume(parseFloat(e.target.value))}
            className='w-16 accent-blue-500'
            aria-labelledby='volume-control'
          />
        </div>
        <AudioOrVideoSourceInput
          onChange={handleAudioOrVideoSourceInputChange}
        />
        <div className='flex gap-4'>
          <StartOrPauseTimerButton
            isRunning={isRunning}
            canResetTimer={canResetTimer}
            canStartPlaying={playerCanPlay}
            handleStartOrPauseTimer={handleStartOrPauseTimerButtonClick}
          />
          <Button
            className='bg-red-500'
            disabled={!canResetTimer}
            onClick={handleResetTimerButtonClick}
          >
            {t('resetButton')}
          </Button>
        </div>
      </section>
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
      <a
        className='absolute right-5 top-4'
        target='_blank'
        rel='noopener noreferrer'
        href='https://github.com/ZaikoXander/HoraDeSilencioInterrompido'
      >
        <FaGithub size={40} />
      </a>
    </main>
  )
}
