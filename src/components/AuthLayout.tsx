import logo from '@/assets/logo.png'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface AuthLayoutProps {
  children: React.ReactNode
  footer?: React.ReactNode
  showLanguageSwitcher?: boolean
}

export function AuthLayout({ children, footer, showLanguageSwitcher = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[hsl(0_0%_97%)] flex flex-col">
      {showLanguageSwitcher && (
        <div className="flex justify-end px-6 pt-5">
          <LanguageSwitcher />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col items-center mb-8">
            <img
              src={logo}
              alt="UrbanFlow"
              className="h-14 w-auto object-contain mb-1 rounded-2xl"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] px-8 py-8">
            {children}
          </div>

          {footer}
        </div>
      </div>
    </div>
  )
}
