import { useRef, useState } from "react"

import Button from "../Button"

export default function FileInputButton() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()

  console.log(file)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const file = event.target.files[0]

    if (!file) return
    
    setFile(file)
  }

  function handleButtonClick() {
    if (!inputRef.current) return

    inputRef.current.click()
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
