import { useTranslation } from 'react-i18next'
import logo from '@/assets/logo.png'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[hsl(0_0%_97%)] flex items-center justify-center p-4">
      <div className="flex flex-col items-center text-center space-y-4 max-w-sm">
        <img
          src={logo}
          alt="UrbanFlow"
          className="h-12 w-auto object-contain rounded-2xl mb-2 opacity-60"
        />
        <p className="text-7xl font-bold text-foreground tracking-tight">404</p>
        <div className="space-y-1">
          <p className="text-base font-semibold text-foreground">
            {t('not_found.title')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('not_found.subtitle')}
          </p>
        </div>
      </div>
    </div>
  )
}
