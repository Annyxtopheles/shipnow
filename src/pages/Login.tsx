import { useState, type FormEvent } from 'react'
import logoFull from '@/assets/images/logo-full.png'
import logoIcon from '@/assets/images/logo-icon.png'
import truckImg from '@/assets/images/login-truck.jpg'
import womanImg from '@/assets/images/login-woman.jpg'
import { TextField } from '@/components/ui/TextField'
import { PasswordField } from '@/components/ui/PasswordField'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { validateEmail, validatePassword } from '@/lib/validation'

interface LoginFormState {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginFormErrors {
  email?: string
  password?: string
}

interface LoginPageProps {
  onLoginSuccess?: () => void
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: true,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: LoginFormErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }
    setErrors(nextErrors)

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) return

    // No backend: simulate a session and hand off to the app shell.
    onLoginSuccess?.()
  }

  function handleDemoFill(e?: React.MouseEvent) {
    if (e) e.preventDefault()
    setForm({
      email: 'admin@shipnow.com',
      password: 'password123',
      rememberMe: true,
    })
    setErrors({})
  }


  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Brand panel - hidden below lg, this is a login-specific promo panel */}
      <div className="relative hidden flex-col items-center overflow-hidden bg-brand-500 px-10 pb-[13.5vh] lg:flex">
        <img src={logoFull} alt="ShipNow" className="mt-[13.4vh] w-[36.8%]" />

        <div className="relative mt-[10vh] h-[41vh] w-[64.7%]">
          <img
            src={truckImg}
            alt="Delivery truck loaded with packages on a city street"
            className="h-full w-full rounded-2xl object-cover opacity-80 shadow-xl"
          />
          <img
            src={womanImg}
            alt="Customer checking a delivery notification on her phone"
            className="absolute -right-[6%] -top-[8%] h-[58%] w-[45%] rounded-2xl object-cover opacity-90 shadow-xl"
          />
        </div>

        <div className="mt-[7.9vh] max-w-[60%] text-center">
          <h1 className="text-2xl font-extrabold text-white">Welcome to ShipNow</h1>
          <p className="mt-2 text-sm text-white/85">
            Manage your shipments, fleet, and warehouse in one smart dashboard.
          </p>
        </div>
      </div>

      {/* Tablet: stacked hero + form, 768px-1023px (per tablet Figma frame) */}
      <div className="block lg:hidden">
        <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-500 px-10 text-center">
          <img src={logoFull} alt="ShipNow" className="w-[40%] max-w-[220px] brightness-0 invert md:w-[37%]" />

          <div className="relative mt-[48px] h-0 w-[69%] max-w-[380px] pb-[69%] md:mt-[54px] md:w-[57%] md:pb-[57%]">
            <img
              src={truckImg}
              alt="Delivery truck loaded with packages on a city street"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover opacity-80 shadow-xl"
            />
            <img
              src={womanImg}
              alt="Customer checking a delivery notification on her phone"
              className="absolute -right-[6%] -top-[8%] h-[58%] w-[46%] rounded-2xl object-cover opacity-90 shadow-xl"
            />
          </div>

          <div className="mt-[81px] max-w-[440px] md:mt-[104px]">
            <h1 className="text-2xl font-extrabold text-white">Welcome to ShipNow</h1>
            <p className="mt-2 text-sm text-white/85">
              Manage your shipments, fleet, and warehouse in one smart dashboard.
            </p>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center bg-white px-6">
          <div className="w-full max-w-sm">
            <div className="flex flex-col items-center text-center">
              <img src={logoIcon} alt="" aria-hidden="true" className="h-8 w-8" />
              <h2 className="mt-4 text-2xl font-extrabold text-ink-900">Welcome Back</h2>
              <p className="mt-1 text-sm text-ink-500">
                Log in to continue managing your logistics with ShipNow
              </p>
            </div>

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="Enter a valid email address"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                error={errors.email}
              />

              <PasswordField
                label="Password"
                autoComplete="current-password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <Checkbox
                  label="Remember Me"
                  checked={form.rememberMe}
                  onChange={(e) => setForm((f) => ({ ...f, rememberMe: e.target.checked }))}
                />
                <a
                  href="#demo"
                  onClick={handleDemoFill}
                  title="Click to auto-fill demo credentials"
                  className="text-sm font-medium text-brand-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" fullWidth>
                Login
              </Button>

              <p className="text-center text-sm text-ink-500">
                Don&apos;t have an account?{' '}
                <a
                  href="#demo"
                  onClick={handleDemoFill}
                  title="Click to auto-fill demo credentials"
                  className="font-semibold text-brand-500 hover:underline"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Form panel - right column at lg+ only (mobile/tablet use the stacked block above) */}
      <div className="hidden min-h-screen items-center justify-center bg-white px-6 py-12 lg:flex">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center">
            <img src={logoIcon} alt="" aria-hidden="true" className="h-8 w-8" />
            <h2 className="mt-4 text-2xl font-extrabold text-ink-900">Welcome Back</h2>
            <p className="mt-1 text-sm text-ink-500">
              Log in to continue managing your logistics with ShipNow
            </p>
          </div>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email Address"
              type="email"
              autoComplete="email"
              placeholder="Enter a valid email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              error={errors.email}
            />

            <PasswordField
              label="Password"
              autoComplete="current-password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              error={errors.password}
            />

            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember Me"
                checked={form.rememberMe}
                onChange={(e) => setForm((f) => ({ ...f, rememberMe: e.target.checked }))}
              />
              <a
                href="#demo"
                onClick={handleDemoFill}
                title="Click to auto-fill demo credentials"
                className="text-sm font-medium text-brand-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <Button type="submit" fullWidth>
              Login
            </Button>

            <p className="text-center text-sm text-ink-500">
              Don&apos;t have an account?{' '}
              <a
                href="#demo"
                onClick={handleDemoFill}
                title="Click to auto-fill demo credentials"
                className="font-semibold text-brand-500 hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
