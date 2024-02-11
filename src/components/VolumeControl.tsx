import { useAtom } from 'jotai'
import { playerMutedAtom, playerVolumeAtom } from '../atoms/player'

import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

export default function VolumeControl() {
  const [playerVolume, changePlayerVolume] = useAtom(playerVolumeAtom)
  const [playerMuted, setPlayerMuted] = useAtom(playerMutedAtom)

  return (
    <div className='flex gap-2'>
      <button
        type='button'
        onClick={() => setPlayerMuted(!playerMuted)}
        className='transition duration-700 ease-in-out hover:scale-110'
      >
        {playerMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
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
  )
}
