import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthLayout } from '@/components/AuthLayout'
import { cn } from '@/lib/utils'
import { apiClient, ApiError } from '@/lib/apiClient'
import { type AppContext } from '@/hooks/useAppContext'

interface LoginPageProps {
  appContext: AppContext
  onNavigateToRegister: () => void
  onNavigateToForgotPassword: () => void
}

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; message: string }

interface SignInResponse {
  accessToken: string
  refreshToken: string
}

export default function LoginPage({ appContext, onNavigateToRegister, onNavigateToForgotPassword }: LoginPageProps) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' })

  const isSubmitting = submit.status === 'submitting'
  const error = submit.status === 'error' ? submit.message : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit({ status: 'submitting' })

    try {
      const data = await apiClient<SignInResponse>('/api/auth/signIn', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('redirect')

      if (redirect) {
        const fragment = new URLSearchParams({
          token: data.accessToken,
          refresh: data.refreshToken,
        }).toString()
        window.location.href = `${decodeURIComponent(redirect)}#${fragment}`
        return
      }
      window.location.href = '/'
    } catch (err) {
      if (err instanceof ApiError) {
        setSubmit({ status: 'error', message: t('errors.invalid_credentials') })
        return
      }
      setSubmit({ status: 'error', message: t('errors.network') })
    }
  }

  return (
    <AuthLayout
      footer={
        appContext === 'user' ? (
          <p className="text-center text-sm text-muted-foreground mt-6">
            {t('login.no_account')}{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t('login.create_account')}
            </button>
          </p>
        ) : null
      }
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          {t('login.title')}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t('login.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

        {error && (
          <p className="text-sm text-destructive bg-destructive/8 rounded-xl px-3 py-2" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className={cn(
            'w-full h-11 rounded-xl text-sm font-semibold mt-2',
            'bg-primary hover:bg-primary/90 text-primary-foreground',
            'shadow-[0_2px_8px_rgba(105,18,226,0.3)] hover:shadow-[0_4px_12px_rgba(105,18,226,0.35)]',
            'transition-all duration-150',
          )}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? <><Loader2 size={16} className="animate-spin" />{t('login.submitting')}</>
            : t('login.submit')
          }
        </Button>
      </form>
    </AuthLayout>
  )
}
