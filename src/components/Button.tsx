import type { ReactNode } from 'react'

import cn from '../lib/cn'

interface ButtonProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export default function Button({ children, className, disabled, onClick }: ButtonProps) {
  return (
    <button
      type='button'
      className={cn(
        'bg-blue-500 text-white py-2 px-4 rounded text-2xl font-[Inter] font-bold disabled:opacity-50',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
