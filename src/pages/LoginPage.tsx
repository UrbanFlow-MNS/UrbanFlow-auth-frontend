import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { type AppContext } from '@/hooks/useAppContext'
import logo from '@/assets/logo.png'

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('fr') ? 'fr' : 'en'

  return (
    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
      <button
        onClick={() => i18n.changeLanguage('fr')}
        className={cn(
          'px-2 py-1 rounded-md transition-colors',
          current === 'fr'
            ? 'text-primary bg-accent'
            : 'hover:text-foreground hover:bg-secondary'
        )}
      >
        FR
      </button>
      <span className="opacity-30">|</span>
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={cn(
          'px-2 py-1 rounded-md transition-colors',
          current === 'en'
            ? 'text-primary bg-accent'
            : 'hover:text-foreground hover:bg-secondary'
        )}
      >
        EN
      </button>
    </div>
  )
}

interface LoginPageProps {
  appContext: AppContext
  onNavigateToRegister: () => void
  onNavigateToForgotPassword: () => void
}

export default function LoginPage({ appContext, onNavigateToRegister, onNavigateToForgotPassword }: LoginPageProps) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError(t('errors.invalid_credentials'))
        return
      }

      const data = await res.json()
      // TODO: stocker le JWT
      console.log('Signed in:', data)
      // TODO: rediriger vers l'app d'origine
    } catch {
      setError(t('errors.network'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(0_0%_97%)] flex flex-col">

      {/* Top bar */}
      <div className="flex justify-end px-6 pt-5">
        <LanguageSwitcher />
      </div>

      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px]">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={logo}
              alt="UrbanFlow"
              className="h-14 w-auto object-contain mb-1 rounded-2xl"
            />
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] px-8 py-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground tracking-tight">
                {t('login.title')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('login.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t('login.email_label')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.email_placeholder')}
                  autoComplete="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    {t('login.password_label')}
                  </Label>
                  <button
                    type="button"
                    onClick={onNavigateToForgotPassword}
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {t('login.forgot_password')}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                    className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] pr-11 placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={t(showPassword ? 'common.hide_password' : 'common.show_password')}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-destructive bg-destructive/8 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className={cn(
                  'w-full h-11 rounded-xl text-sm font-semibold mt-2',
                  'bg-primary hover:bg-primary/90 text-primary-foreground',
                  'shadow-[0_2px_8px_rgba(105,18,226,0.3)] hover:shadow-[0_4px_12px_rgba(105,18,226,0.35)]',
                  'transition-all duration-150',
                )}
                disabled={isLoading}
              >
                {isLoading
                  ? <><Loader2 size={16} className="animate-spin" />{t('login.submitting')}</>
                  : t('login.submit')
                }
              </Button>

            </form>
          </div>

          {/* Register link — user app only */}
          {appContext === 'user' && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              {t('login.no_account')}{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t('login.create_account')}
              </button>
            </p>
          )}

        </div>
      </div>
    </div>
  )
}
