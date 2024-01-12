import { useEffect, useRef, useState } from 'react'

import '@vidstack/react/player/styles/base.css'
import { MediaPlayer, MediaPlayerInstance, MediaProvider } from '@vidstack/react'

import Button from './components/Button'
import StartOrPauseTimerButton from './components/StartOrPauseTimerButton'

import useTimer from './hooks/useTimer'

import OneHourRandomAudioMomentsGenerator from './classes/oneHourRandomAudioMomentsGenerator'
import extractYoutubeVideoId from './utils/extractYoutubeVideoId'

import { FaGithub } from 'react-icons/fa'

const ONE_HOUR_IN_SECONDS = 3600
const TIMER_FORMAT_LENGTH = 2
const TIMER_FORMAT_PADDING = '0'

export default function App() {
  const player: React.RefObject<MediaPlayerInstance> = useRef<MediaPlayerInstance>(null)
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState<string>('')
  const [canStartPlaying, setCanStartPlaying] = useState<boolean>(false)
  const [isAudioPaused, setIsAudioPaused] = useState<boolean>(true)
  const [audioMoments, setAudioMoments] = useState<number[] | null>()
  const [shouldAudioUnpause, setShouldAudioUnpause] = useState<boolean>(false)
  
  const { timeLeft, startOrPause, reset, isRunning } = useTimer(ONE_HOUR_IN_SECONDS)
  const canResetTimer = timeLeft.getTotalSeconds() < ONE_HOUR_IN_SECONDS

  function handleYoutubeVideoUrlChange(event: React.ChangeEvent<HTMLInputElement>): void {
    reset()
    setCanStartPlaying(false)
    setYoutubeVideoUrl(event.target.value)
  }

  const youtubeVideoId: string | null = extractYoutubeVideoId(youtubeVideoUrl)

  async function playAudio(): Promise<void> {
    if (player.current?.paused) {
      await player.current.play()
      setIsAudioPaused(false)
    }
  }

  async function pauseAudio(): Promise<void> {
    if (player.current && !player.current.paused) {
      await player.current.pause()
      setIsAudioPaused(true)
    }
  }

  async function resetAudio(): Promise<void> {
    if (player.current && !(player.current.paused && player.current.currentTime === 0)) {
      pauseAudio()
      player.current.currentTime = 0
    }
  }

  function handleStartOrPauseTimer(): void {
    startOrPause()

    if (player.current && !audioMoments) {
      const audioDuration: number = player.current.$state.duration()
      const oneHourRandomAudioMomentsGenerator = new OneHourRandomAudioMomentsGenerator(audioDuration)
      const generatedRandomAudioMoments = oneHourRandomAudioMomentsGenerator.execute()
      setAudioMoments(generatedRandomAudioMoments)
    }
  }

  function handleResetTimer(): void {
    reset()
    resetAudio()
    setAudioMoments(null)
  }

  function properlyTimerFormat(digit: number): string {
    return digit.toString().padStart(TIMER_FORMAT_LENGTH, TIMER_FORMAT_PADDING)
  }

  useEffect(() => {
    if (!isRunning) {
      if (!isAudioPaused) {
        pauseAudio()
        setShouldAudioUnpause(true)
      }

      return
    }

    if (!isAudioPaused || !audioMoments) return

    if (shouldAudioUnpause) {
      playAudio()
      setShouldAudioUnpause(false)

      return
    }

    const audioShouldPlay = timeLeft.getTotalSeconds() === (ONE_HOUR_IN_SECONDS - audioMoments[0])

    if (!audioShouldPlay) return

    playAudio()
    setAudioMoments(audioMoments.slice(1))
  }, [audioMoments, canStartPlaying, isAudioPaused, isRunning, shouldAudioUnpause, timeLeft])

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#FFD700] pb-32 gap-40">
      <h1 className="text-6xl text-[#333333] font-[Baloo] font-bold drop-shadow shadow-black">
        Uma hora de silêncio interrompido
      </h1>
      <section className="flex flex-col items-center gap-12">
        <time
          className="
            w-60 flex justify-center rounded py-3 px-4 bg-black shadow shadow-black mb-10 text-5xl text-[#FFA500]
            font-[Inter]
          "
        >
          {
            properlyTimerFormat(timeLeft.getHours())
          }:{
            properlyTimerFormat(timeLeft.getMinutes())
          }:{
            properlyTimerFormat(timeLeft.getSeconds())
          }
        </time>
        <div className="flex flex-col gap-y-4">
          <p className='opacity-50'>Em breve, será possível fazer o upload de arquivos de áudio ou vídeo.</p>
          <div className="flex gap-4 hidden">
            <div>
              <input type="file" accept="audio/*, video/*" id="audio-upload" className="hidden" />
              <label
                htmlFor="audio-upload"
                className="bg-blue-500 text-white py-2 px-4 rounded text-2xl font-[Inter] font-bold cursor-pointer"
              >
                Usar arquivo de áudio ou vídeo
              </label>
            </div>
            <span className="text-2xl font-[Inter] font-semibold">ou</span>
          </div>
          <input
            type="url"
            className="
              border border-gray-300 rounded py-2 px-4 text-2xl font-[Inter] font-semibold outline-none
              focus:border-blue-500 focus:border focus:ring-2 focus:ring-blue-500
            "
            placeholder="Link do youtube"
            onChange={handleYoutubeVideoUrlChange}
          />
        </div>
        <div className="flex gap-4">
          <StartOrPauseTimerButton
            isRunning={isRunning}
            canResetTimer={canResetTimer}
            canStartPlaying={canStartPlaying}
            handleStartOrPauseTimer={handleStartOrPauseTimer}
          />
          <Button
            className="bg-red-500"
            disabled={!canResetTimer}
            onClick={handleResetTimer}
          >
            Zerar
          </Button>
        </div>
      </section>
      <MediaPlayer
        className='absolute bottom-0 opacity-0 -z-50'
        src={`youtube/${youtubeVideoId}`}
        ref={player}
        onCanPlay={() => setCanStartPlaying(true)}
        onEnd={() => resetAudio()}
      >
        <MediaProvider />
      </MediaPlayer>
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
