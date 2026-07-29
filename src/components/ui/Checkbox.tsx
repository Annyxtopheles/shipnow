import { useId, type InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label htmlFor={inputId} className="flex select-none items-center gap-2 text-sm text-ink-700">
      <input
        id={inputId}
        type="checkbox"
        className={`h-4 w-4 rounded border-surface-border text-brand-500 accent-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${className}`}
        {...props}
      />
      {label}
    </label>
  )
}
