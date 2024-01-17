import { useRef } from "react"

import Button from "../Button"

interface FileInputButtonProps {
  onChange?: (file: File) => void
}

export default function FileInputButton({ onChange }: FileInputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

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
        type="file"
        ref={inputRef}
        accept="audio/*, video/*"
        className="hidden"
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>Usar arquivo de áudio ou vídeo</Button>
    </div>
  )
}
