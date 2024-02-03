import type { ReactNode } from 'react'

import cn from '../lib/cn'

interface ButtonProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  children,
  className,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type='button'
      className={cn(
        'rounded bg-blue-500 px-4 py-2 font-[Inter] text-2xl font-bold',
        'text-white disabled:opacity-50',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
