import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthLayout } from '@/components/AuthLayout'
import { cn } from '@/lib/utils'
import { apiClient, ApiError } from '@/lib/apiClient'

interface RegisterPageProps {
  onNavigateToLogin: () => void
}

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'error'; message: string }

export default function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' })
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })

  const isSubmitting = submit.status === 'submitting'
  const error = submit.status === 'error' ? submit.message : null

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit({ status: 'submitting' })

    try {
      await apiClient('/api/auth/signUp', {
        method: 'POST',
        body: JSON.stringify({
          firstName: form.firstname,
          lastName: form.lastname,
          email: form.email,
          password: form.password,
          role: 'CLASSIC_USER',
        }),
      })

      onNavigateToLogin()
    } catch (err) {
      if (err instanceof ApiError) {
        const body = err.body as { message?: string } | null
        setSubmit({ status: 'error', message: body?.message ?? t('errors.register_failed') })
        return
      }
      setSubmit({ status: 'error', message: t('errors.network') })
    }
  }

  return (
    <AuthLayout
      footer={
        <p className="text-center text-sm text-muted-foreground mt-6">
          {t('register.already_account')}{' '}
          <button
            onClick={onNavigateToLogin}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {t('register.sign_in')}
          </button>
        </p>
      }
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          {t('register.title')}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t('register.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstname" className="text-sm font-medium text-foreground">
              {t('register.firstname_label')}
            </Label>
            <Input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="given-name"
              value={form.firstname}
              onChange={onFieldChange}
              required
              className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] focus-visible:ring-primary/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastname" className="text-sm font-medium text-foreground">
              {t('register.lastname_label')}
            </Label>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              value={form.lastname}
              onChange={onFieldChange}
              required
              className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] focus-visible:ring-primary/30"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            {t('register.email_label')}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t('register.email_placeholder')}
            autoComplete="email"
            value={form.email}
            onChange={onFieldChange}
            required
            className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            {t('register.password_label')}
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              value={form.password}
              onChange={onFieldChange}
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
            ? <><Loader2 size={16} className="animate-spin" />{t('register.submitting')}</>
            : t('register.submit')
          }
        </Button>
      </form>
    </AuthLayout>
  )
}
