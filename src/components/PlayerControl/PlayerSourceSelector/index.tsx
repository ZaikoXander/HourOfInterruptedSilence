import FileInputButton from './FileInputButton'
import YoutubeVideoUrlInput from './YoutubeVideoUrlInput'

import { useTranslation } from 'react-i18next'

export default function PlayerSourceSelector() {
  const { t } = useTranslation('', { keyPrefix: 'playerSourceSelector' })

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between gap-4 pr-4'>
        <FileInputButton />
        <span className='font-[Inter] text-2xl font-semibold'>
          {t('playerSourceSelectorSpan')}
        </span>
      </div>
      <YoutubeVideoUrlInput />
    </div>
  )
}
