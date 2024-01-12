import { ReactNode } from "react"

interface ButtonProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export default function Button({ children, className, disabled, onClick }: ButtonProps) {
  return (
    <button
      className={
        [
          'bg-blue-500 text-white py-2 px-4 rounded text-2xl font-[Inter] font-bold disabled:opacity-50',
          className
        ].join(' ')
      }
      disabled={disabled}
      onClick={onClick}
    >
      { children }
    </button>
  )
}
