import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
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

interface RegisterPageProps {
  onNavigateToLogin: () => void
}

export default function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: connect to user service via gateway
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
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
                {t('register.title')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('register.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* First name + Last name */}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                    className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] focus-visible:ring-primary/30"
                  />
                </div>
              </div>

              {/* Email */}
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
                  onChange={handleChange}
                  required
                  className="h-11 rounded-xl border-border bg-[hsl(0_0%_98%)] placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
                />
              </div>

              {/* Password */}
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
                    onChange={handleChange}
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
                  ? <><Loader2 size={16} className="animate-spin" />{t('register.submitting')}</>
                  : t('register.submit')
                }
              </Button>

            </form>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {t('register.already_account')}{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t('register.sign_in')}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}
