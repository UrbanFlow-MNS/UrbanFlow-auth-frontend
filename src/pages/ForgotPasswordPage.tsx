import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthLayout } from '@/components/AuthLayout'
import { cn } from '@/lib/utils'

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void
}

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }

export default function ForgotPasswordPage({ onNavigateToLogin }: ForgotPasswordPageProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' })

  const isSubmitting = submit.status === 'submitting'
  const submitted = submit.status === 'success'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit({ status: 'submitting' })
    // TODO: call auth service password reset endpoint via gateway
    await new Promise((r) => setTimeout(r, 1500))
    setSubmit({ status: 'success' })
  }

  return (
    <AuthLayout
      showLanguageSwitcher={false}
      footer={
        !submitted ? (
          <p className="text-center mt-6">
            <button
              onClick={onNavigateToLogin}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <ArrowLeft size={15} />
              {t('forgot_password.back_to_login')}
            </button>
          </p>
        ) : null
      }
    >
      {submitted ? (
        <div className="flex flex-col items-center text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
            <MailCheck size={26} className="text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">
              {t('forgot_password.success_title')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('forgot_password.success_subtitle')}
            </p>
          </div>
          <button
            onClick={onNavigateToLogin}
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors mt-2"
          >
            <ArrowLeft size={15} />
            {t('forgot_password.back_to_login')}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">
              {t('forgot_password.title')}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('forgot_password.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                {t('forgot_password.email_label')}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('forgot_password.email_placeholder')}
                autoComplete="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
              />
            </div>

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
                ? <><Loader2 size={16} className="animate-spin" />{t('forgot_password.submitting')}</>
                : t('forgot_password.submit')
              }
            </Button>
          </form>
        </>
      )}
    </AuthLayout>
  )
}
