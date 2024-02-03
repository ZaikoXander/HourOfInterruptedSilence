import { useRef } from 'react'

import Button from '../Button'

import { useTranslation } from 'react-i18next'

interface FileInputButtonProps {
  onChange?: (file: File) => void
}

export default function FileInputButton({ onChange }: FileInputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation('', { keyPrefix: 'fileInputButton' })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    onChange?.(file)
    event.target.value = ''
  }

  function handleButtonClick() {
    inputRef.current?.click()
  }

  return (
    <div>
      <input
        type='file'
        ref={inputRef}
        accept='audio/*, video/*'
        className='hidden'
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>{t('fileInputButtonText')}</Button>
    </div>
  )
}
