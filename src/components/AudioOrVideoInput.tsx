interface AudioOrVideoInputProps {
  handleYoutubeVideoUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AudioOrVideoInput({ handleYoutubeVideoUrlChange }: AudioOrVideoInputProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <p className='opacity-50'>Em breve, será possível fazer o upload de arquivos de áudio ou vídeo.</p>
      <div className="flex gap-4 hidden">
        <div>
          <input type="file" accept="audio/*, video/*" id="audio-upload" className="hidden" />
          <label
            htmlFor="audio-upload"
            className="bg-blue-500 text-white py-2 px-4 rounded text-2xl font-[Inter] font-bold cursor-pointer"
          >
            Usar arquivo de áudio ou vídeo
          </label>
        </div>
        <span className="text-2xl font-[Inter] font-semibold">ou</span>
      </div>
      <input
        type="url"
        className="
          border border-gray-300 rounded py-2 px-4 text-2xl font-[Inter] font-semibold outline-none
          focus:border-blue-500 focus:border focus:ring-2 focus:ring-blue-500
        "
        placeholder="Link do youtube"
        onChange={handleYoutubeVideoUrlChange}
      />
    </div>
  )
}
