import { useAtomValue } from 'jotai'

import { formattedTimeAtom } from '../../atoms/timer'

import cn from '../../lib/cn'

export default function Timer({ className }: { className?: string }) {
  const formattedTime = useAtomValue(formattedTimeAtom)

  return (
    <time
      className={cn(
        'flex w-60 justify-center rounded bg-black px-4 py-3 font-[Inter]',
        'text-5xl text-[#FFA500] shadow shadow-black',
        className,
      )}
    >
      {formattedTime}
    </time>
  )
}
