import FileInputButton from "./FileInputButton"

interface AudioOrVideoInputProps {
  handleYoutubeVideoUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AudioOrVideoInput({ handleYoutubeVideoUrlChange }: AudioOrVideoInputProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-4 justify-between pr-4">
        <FileInputButton />
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
        onChange={handleYoutubeVideoUrlChange}
      />
    </div>
  )
}
