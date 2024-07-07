import { useEffect, useRef } from 'react'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { playerAtom } from '../../atoms/player'
import { resumePlayerAtom } from '../../atoms/player/remote'
import {
  removeActualAudioMomentAtom,
  audioMomentShouldPlayAtom,
} from '../../atoms/audioMoments'
import { timeTickingEffect } from '../../atoms/timer'

import type { MediaPlayerInstance } from '@vidstack/react'

import Timer from './Timer'
import VolumeControl from './VolumeControl'
import PlayerSourceSelector from './PlayerSourceSelector'
import TimerControlButtons from './TimerControlButtons'
import HiddenMediaPlayer from './HiddenMediaPlayer'

export default function PlayerControl() {
  const setPlayer = useSetAtom(playerAtom)
  setPlayer(useRef<MediaPlayerInstance>(null))

  const audioMomentShouldPlay = useAtomValue(audioMomentShouldPlayAtom)
  const removeActualAudioMoment = useSetAtom(removeActualAudioMomentAtom)

  const resumePlayer = useSetAtom(resumePlayerAtom)

  useAtom(timeTickingEffect)

  useEffect(() => {
    function handleAudioMoments() {
      if (audioMomentShouldPlay) {
        resumePlayer()
        removeActualAudioMoment()
      }
    }

    handleAudioMoments()
  }, [audioMomentShouldPlay, resumePlayer, removeActualAudioMoment])

  return (
    <>
      <section className='flex flex-col items-center gap-12'>
        <Timer className='mb-10' />
        <VolumeControl />
        <PlayerSourceSelector />
        <TimerControlButtons />
      </section>
      <HiddenMediaPlayer />
    </>
  )
}
