import { useTranslation } from 'react-i18next'

import cn from '../../lib/cn'

import extractYoutubeVideoId from '../../utils/extractYoutubeVideoId'

interface YoutubeVideoUrlInputProps {
  onChange?: (youtubeVideoUrl: string) => void
}

export default function YoutubeVideoUrlInput({ onChange }: YoutubeVideoUrlInputProps) {
  const { t } = useTranslation('', { keyPrefix: 'youtubeVideoUrlInput' })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const url = event.target.value
    const id = extractYoutubeVideoId(url)
    const source = `youtube/${id}`
    if (!id) return

    onChange?.(source)
  }

  return (
    <input
      type='url'
      className={cn(
        'border border-gray-300 rounded py-2 px-4 text-2xl font-[Inter] font-semibold outline-none',
        'focus:border-blue-500 focus:border focus:ring-2 focus:ring-blue-500',
      )}
      placeholder={t('placeholder')}
      onChange={handleInputChange}
    />
  )
}
