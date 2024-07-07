import { atom } from 'jotai'

import { playerAtom } from '.'

import { useMediaStore, type MediaState } from '@vidstack/react'

const storeAtom = atom<Readonly<MediaState>>((get) =>
  useMediaStore(get(playerAtom)),
)

export { storeAtom }
