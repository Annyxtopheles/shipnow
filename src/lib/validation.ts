const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Email address is required'
  if (!EMAIL_REGEX.test(value)) return 'Enter a valid email address'
  return undefined
}

export function validatePassword(value: string, minLength = 8): string | undefined {
  if (!value) return 'Password is required'
  if (value.length < minLength) return `Password must be at least ${minLength} characters`
  return undefined
}

export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value.trim()) return `${fieldName} is required`
  return undefined
}
