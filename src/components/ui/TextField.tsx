import { useId, type InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextField({ label, error, id, className = '', ...props }: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold text-ink-900">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-lg bg-surface-muted px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/70
          outline-none ring-1 ring-transparent transition
          focus:bg-white focus:ring-2 focus:ring-brand-500
          ${error ? 'ring-2 ring-red-400 bg-red-50/50' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
