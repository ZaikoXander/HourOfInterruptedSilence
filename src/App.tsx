import { useCallback, useEffect, useRef, useState } from 'react'

import '@vidstack/react/player/styles/base.css'
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore, useMediaRemote } from '@vidstack/react'

import Timer from './components/Timer'
import AudioOrVideoInput from './components/AudioOrVideoInput'
import StartOrPauseTimerButton from './components/StartOrPauseTimerButton'
import Button from './components/Button'

import useTimer from './hooks/useTimer'

import OneHourRandomAudioMomentsGenerator from './classes/oneHourRandomAudioMomentsGenerator'
import extractYoutubeVideoId from './utils/extractYoutubeVideoId'

import { FaGithub } from 'react-icons/fa'

import { ONE_HOUR_IN_SECONDS } from './constants'

export default function App() {
  const player: React.RefObject<MediaPlayerInstance> = useRef<MediaPlayerInstance>(null)
  const remote = useMediaRemote(player)
  const {
    paused: playerPaused,
    currentTime: playerCurrentTime,
    duration: playerDuration,
    canPlay: playerCanPlay,
  } = useMediaStore(player)

  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState<string>('')
  const [audioMoments, setAudioMoments] = useState<number[] | null>()
  const [audioShouldUnpause, setAudioShouldUnpause] = useState<boolean>(false)
  
  const { timeLeft, start, pause, reset, isRunning } = useTimer(ONE_HOUR_IN_SECONDS)
  const canResetTimer = timeLeft.getTotalSeconds() < ONE_HOUR_IN_SECONDS

  function handleYoutubeVideoUrlChange(event: React.ChangeEvent<HTMLInputElement>): void {
    reset()
    const url = event.target.value
    setYoutubeVideoUrl(url)
  }

  const youtubeVideoId: string | null = extractYoutubeVideoId(youtubeVideoUrl)

  const playAudio = useCallback(() => remote.play(), [remote])
  const pauseAudio = useCallback(() => remote.pause(), [remote])

  function resetAudio(): void {
    const playerReset = playerPaused && playerCurrentTime === 0
    if (!playerReset) {
      pauseAudio()
      remote.seek(0)
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

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#FFD700] pb-32 gap-40">
      <h1 className="text-6xl text-[#333333] font-[Baloo] font-bold drop-shadow shadow-black">
        Uma hora de silêncio interrompido
      </h1>
      <section className="flex flex-col items-center gap-12">
        <Timer timeLeft={timeLeft} />
        <AudioOrVideoInput handleYoutubeVideoUrlChange={handleYoutubeVideoUrlChange} />
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
            Zerar
          </Button>
        </div>
      </section>
      <div className='absolute bottom-0 opacity-0 -z-50'>
        <MediaPlayer
          src={`youtube/${youtubeVideoId}`}
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
