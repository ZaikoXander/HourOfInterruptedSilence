import { useRef, useState } from 'react'

import Button from '../../Button'

import { useTranslation } from 'react-i18next'

interface FileInputButtonProps {
  onChange?: (file: File) => void
}

export default function FileInputButton({ onChange }: FileInputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | undefined>(undefined)

  const { t } = useTranslation('', { keyPrefix: 'fileInputButton' })

  function isNewFileEqualToPrevious(newFile: File): boolean {
    return (
      newFile.name === file!.name &&
      newFile.size === file!.size &&
      newFile.lastModified === file!.lastModified
    )
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFile = event.target.files?.item(0)

    if (!newFile || (file && isNewFileEqualToPrevious(newFile))) return

    setFile(newFile)
    onChange?.(newFile)
  }

  function triggerFileInput() {
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
      <Button onClick={triggerFileInput}>{t('fileInputButtonText')}</Button>
    </div>
  )
}
