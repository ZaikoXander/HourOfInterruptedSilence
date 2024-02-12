import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

import { timerTotalSecondsAtom } from './timer'

const { floor, random, round, abs } = Math

import { ONE_HOUR_IN_SECONDS } from '../constants'

const AUDIO_MOMENT_INTERVAL = 5
const INITIAL_AUDIO_MOMENT = 0
const RANDOM_AUDIO_MOMENTS_PER_HOUR = 13

function generateRandomAudioMoment(
  audioMomentDuration: number,
  lastPossibleAudioMoment: number,
): number {
  const min = audioMomentDuration
  const max = lastPossibleAudioMoment + 1

  return floor(random() * max) + min
}

function isAudioMomentInAcceptableRange(
  newAudioMoment: number,
  audioMoments: number[],
  audioMomentDuration: number,
) {
  return audioMoments.some(
    (existingMoment) =>
      abs(existingMoment - newAudioMoment) < audioMomentDuration,
  )
}

function generateRandomAudioMoments(audioDuration: number): number[] {
  const audioMomentDuration = round(audioDuration) + AUDIO_MOMENT_INTERVAL
  const finalAudioMoment = ONE_HOUR_IN_SECONDS - audioMomentDuration
  const newAudioMoments = [INITIAL_AUDIO_MOMENT, finalAudioMoment]
  const lastPossibleAudioMoment = finalAudioMoment - audioMomentDuration * 2

  for (let i = 0; i < RANDOM_AUDIO_MOMENTS_PER_HOUR; i++) {
    let randomAudioMoment: number
    do {
      randomAudioMoment = generateRandomAudioMoment(
        audioMomentDuration,
        lastPossibleAudioMoment,
      )
    } while (
      isAudioMomentInAcceptableRange(
        randomAudioMoment,
        newAudioMoments,
        audioMomentDuration,
      )
    )

    newAudioMoments.push(randomAudioMoment)
  }

  newAudioMoments.sort((momentA, momentB) => momentA - momentB)

  return newAudioMoments
}

const audioMomentsAtom = atomWithReset<number[] | undefined>(undefined)
const generateRandomAudioMomentsAtom = atom(
  null,
  (_get, set, audioDuration: number) => {
    const randomAudioMoments = generateRandomAudioMoments(audioDuration)
    set(audioMomentsAtom, randomAudioMoments)
  },
)
const removeActualAudioMomentAtom = atom(null, (_get, set) =>
  set(audioMomentsAtom, (previousAudioMoments) =>
    previousAudioMoments?.slice(1),
  ),
)
const audioMomentShouldUnpauseAtom = atom<boolean>(false)
const audioMomentShouldPlayAtom = atom((get) => {
  const audioMoments = get(audioMomentsAtom)

  if (!audioMoments || audioMoments.length === 0) return false

  const [nextAudioMoment] = audioMoments
  const secondsToNextAudioMoment = ONE_HOUR_IN_SECONDS - nextAudioMoment

  return get(timerTotalSecondsAtom) === secondsToNextAudioMoment
})

export {
  audioMomentsAtom,
  generateRandomAudioMomentsAtom,
  removeActualAudioMomentAtom,
  audioMomentShouldUnpauseAtom,
  audioMomentShouldPlayAtom,
}
