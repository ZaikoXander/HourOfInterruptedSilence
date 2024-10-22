import { atom } from 'jotai'

import { playerAtom } from '.'

import { type MediaRemoteControl, useMediaRemote } from '@vidstack/react'

const remoteAtom = atom<MediaRemoteControl>((get) =>
  useMediaRemote(get(playerAtom)),
)

const resumePlayerAtom = atom(null, (get) => {
  const remote = get(remoteAtom)

  remote.play()
})

const pausePlayerAtom = atom(null, (get) => {
  const remote = get(remoteAtom)

  remote.pause()
})

const resetPlayerCurrentTimeAtom = atom(null, (get) => {
  const remote = get(remoteAtom)

  remote.seek(0)
})

export {
  remoteAtom,
  resumePlayerAtom,
  pausePlayerAtom,
  resetPlayerCurrentTimeAtom,
}
