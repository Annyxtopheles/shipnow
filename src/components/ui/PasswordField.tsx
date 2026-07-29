import { useId, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function PasswordField({ label, error, id, className = '', ...props }: PasswordFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold text-ink-900">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full rounded-lg bg-surface-muted px-4 py-3 pr-11 text-sm text-ink-900 placeholder:text-ink-500/70
            outline-none ring-1 ring-transparent transition
            focus:bg-white focus:ring-2 focus:ring-brand-500
            ${error ? 'ring-2 ring-red-400 bg-red-50/50' : ''}
            ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
