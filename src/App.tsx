import { useEffect } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'

import usePlayer from './hooks/usePlayer'

import {
  playerSourceAtom,
  playerVolumeAtom,
  playerMutedAtom,
} from './atoms/player'
import {
  audioMomentsAtom,
  audioMomentShouldUnpauseAtom,
} from './atoms/audioMoments'
import {
  timerTotalSecondsAtom,
  timerIsRunningAtom,
  startTimerAtom,
  pauseTimerAtom,
  resetTimerAtom,
  timerCanResetAtom,
  timeTickingEffect,
} from './atoms/timer'

import cn from './lib/cn'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'

import {
  AudioOrVideoSourceInput,
  Button,
  StartOrPauseTimerButton,
  Timer,
  VolumeControl,
} from './components'

import OneHourRandomAudioMomentsGenerator from './classes/oneHourRandomAudioMomentsGenerator'

import { useTranslation } from 'react-i18next'

import { ONE_HOUR_IN_SECONDS } from './constants'

import { FaGithub } from 'react-icons/fa'

export default function App() {
  const {
    player,
    playerPaused,
    playerCurrentTime,
    playerDuration,
    playerCanPlay,
    resumePlayer,
    pausePlayer,
    resetPlayerCurrentTime,
    resetPlayer,
  } = usePlayer()

  const [playerSource, setPlayerSource] = useAtom(playerSourceAtom)
  const playerVolume = useAtomValue(playerVolumeAtom)
  const playerMuted = useAtomValue(playerMutedAtom)

  const [audioMoments, setAudioMoments] = useAtom(audioMomentsAtom)
  const resetAudioMoments = useResetAtom(audioMomentsAtom)
  const [audioMomentShouldUnpause, setAudioMomentShouldUnpause] = useAtom(
    audioMomentShouldUnpauseAtom,
  )

  const timerTotalSeconds = useAtomValue(timerTotalSecondsAtom)
  const timerIsRunning = useAtomValue(timerIsRunningAtom)
  const startTimer = useSetAtom(startTimerAtom)
  const pauseTimer = useSetAtom(pauseTimerAtom)
  const resetTimer = useSetAtom(resetTimerAtom)
  const timerCanReset = useAtomValue(timerCanResetAtom)
  useAtom(timeTickingEffect)

  const { t, i18n } = useTranslation('', { keyPrefix: 'app' })

  function handleAudioOrVideoSourceInputChange(input: string | File): void {
    resetTimer()
    if (playerSource !== '') {
      resetAudioMoments()
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

  function handleStartOrPauseTimerButtonClick(): void {
    if (!audioMoments) handleRandomAudioMomentsGeneration()

    if (timerIsRunning) {
      handlePauseTimer()
      return
    }

    handleStartTimer()
  }

  function handleResetTimerButtonClick(): void {
    resetTimer()

    if (playerCurrentTime > 0) {
      resetPlayer()
      resetAudioMoments()
    }
  }

  useEffect(() => {
    function handleAudioMoments() {
      if (!audioMoments) return

      const nextMoment = audioMoments[0]
      const secondsToNextMoment = ONE_HOUR_IN_SECONDS - nextMoment
      const audioShouldPlay = timerTotalSeconds === secondsToNextMoment

      if (audioShouldPlay) {
        resumePlayer()

        const updatedAudioMoments = audioMoments.slice(1)
        setAudioMoments(updatedAudioMoments)
      }
    }

    handleAudioMoments()
  }, [audioMoments, timerTotalSeconds, resumePlayer, setAudioMoments])

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
        <Timer className='mb-10' />
        <VolumeControl />
        <AudioOrVideoSourceInput
          onChange={handleAudioOrVideoSourceInputChange}
        />
        <div className='flex gap-4'>
          <StartOrPauseTimerButton
            disabled={!playerCanPlay}
            onClick={handleStartOrPauseTimerButtonClick}
          />
          <Button
            className='bg-red-500'
            disabled={!timerCanReset}
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
