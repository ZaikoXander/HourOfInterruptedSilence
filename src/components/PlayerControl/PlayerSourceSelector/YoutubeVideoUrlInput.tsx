import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import cn from '../../../lib/cn'

interface YoutubeVideoUrlInputProps {
  onChange?: (youtubeVideoUrl: string) => void
}

function extractYoutubeVideoIdByUrl(url: string): string | null {
  const regex: RegExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
  const match: RegExpMatchArray | null = url.match(regex)

  return match ? match[1] : null
}

export default function YoutubeVideoUrlInput({
  onChange,
}: YoutubeVideoUrlInputProps) {
  const [source, setSource] = useState<string>('')

  const { t } = useTranslation('', { keyPrefix: 'youtubeVideoUrlInput' })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const url = event.target.value
    const id = extractYoutubeVideoIdByUrl(url)

    if (!id) return

    const newSource = `youtube/${id}`
    if (newSource === source) return

    setSource(newSource)
    onChange?.(newSource)
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
