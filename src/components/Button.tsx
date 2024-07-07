import type { ReactNode } from 'react'

import cn from '../lib/cn'

interface ButtonProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: VoidFunction
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
        'text-white shadow-sm shadow-black transition-all hover:bg-blue-600',
        'hover:text-gray-100 disabled:opacity-50 disabled:hover:bg-blue-500',
        'disabled:hover:text-white',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
