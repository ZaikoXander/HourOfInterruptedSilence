import { useTranslation } from 'react-i18next'

import cn from '../../lib/cn'

import extractYoutubeVideoId from '../../utils/extractYoutubeVideoId'

interface YoutubeVideoUrlInputProps {
  onChange?: (youtubeVideoUrl: string) => void
}

export default function YoutubeVideoUrlInput({
  onChange,
}: YoutubeVideoUrlInputProps) {
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
        'rounded border border-gray-300 px-4 py-2 font-[Inter] text-2xl',
        'font-semibold outline-none focus:border focus:border-blue-500',
        'focus:ring-2 focus:ring-blue-500',
      )}
      placeholder={t('placeholder')}
      onChange={handleInputChange}
    />
  )
}
