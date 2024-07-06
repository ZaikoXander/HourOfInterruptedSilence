import { useRef } from 'react'
import { atom, useAtom } from 'jotai'

import Button from '../Button'

import { useTranslation } from 'react-i18next'

import type { InputFile } from '../../types'

const fileAtom = atom<InputFile | undefined>(undefined)

interface FileInputButtonProps {
  onChange?: (file: InputFile) => void
}

export default function FileInputButton({ onChange }: FileInputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useAtom(fileAtom)
  const { t } = useTranslation('', { keyPrefix: 'fileInputButton' })

  function isNewFileEqualToPrevious(
    newFile: InputFile | null | undefined,
  ): boolean {
    if (!newFile || !file) return false

    return (
      newFile.name === file.name &&
      newFile.size === file.size &&
      newFile.lastModified === file.lastModified
    )
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFile: InputFile | null | undefined = event.target.files?.item(0)
    if (!newFile || isNewFileEqualToPrevious(newFile)) return

    setFile(newFile)
    onChange?.(newFile)
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
