import FileInputButton from "./FileInputButton"

import extractYoutubeVideoId from "../../utils/extractYoutubeVideoId"

interface AudioOrVideoInputProps {
  onChange?: (input: string | File) => void
}

export default function AudioOrVideoSourceInput({ onChange }: AudioOrVideoInputProps) {
  function handleYoutubeVideoUrlInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const url = event.target.value
    const id = extractYoutubeVideoId(url)
    const source = 'youtube/' + id
    if (!id) return

    onChange?.(source)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-4 justify-between pr-4">
        <FileInputButton onChange={onChange} />
        <span className="text-2xl font-[Inter] font-semibold">ou</span>
      </div>
      <input
        type="url"
        className={
          [
            'border border-gray-300 rounded py-2 px-4 text-2xl font-[Inter] font-semibold outline-none',
            'focus:border-blue-500 focus:border focus:ring-2 focus:ring-blue-500'
          ].join(' ')
        }
        placeholder="Link do youtube"
        onChange={handleYoutubeVideoUrlInputChange}
      />
    </div>
  )
}
