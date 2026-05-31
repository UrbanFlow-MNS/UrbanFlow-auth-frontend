import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.png'

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void
}

export default function ForgotPasswordPage({ onNavigateToLogin }: ForgotPasswordPageProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: call auth service password reset endpoint via gateway
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[hsl(0_0%_97%)] flex items-center justify-center p-4">
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

          {submitted ? (
            /* Success state */
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
            /* Form state */
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground tracking-tight">
                  {t('forgot_password.title')}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('forgot_password.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  disabled={isLoading}
                >
                  {isLoading
                    ? <><Loader2 size={16} className="animate-spin" />{t('forgot_password.submitting')}</>
                    : t('forgot_password.submit')
                  }
                </Button>
              </form>
            </>
          )}
        </div>

        {/* Back link (visible only in form state) */}
        {!submitted && (
          <p className="text-center mt-6">
            <button
              onClick={onNavigateToLogin}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <ArrowLeft size={15} />
              {t('forgot_password.back_to_login')}
            </button>
          </p>
        )}

      </div>
    </div>
  )
}
