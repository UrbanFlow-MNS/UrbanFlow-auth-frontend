import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from '@/hooks/useAppContext'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import NotFoundPage from '@/pages/NotFoundPage'

type Page = 'login' | 'register' | 'forgot-password'

function LoginFlow() {
  const appContext = useAppContext()
  const [page, setPage] = useState<Page>('login')

  if (!appContext) return <NotFoundPage />

  if (page === 'register' && appContext === 'user') {
    return <RegisterPage onNavigateToLogin={() => setPage('login')} />
  }

  if (page === 'forgot-password') {
    return <ForgotPasswordPage onNavigateToLogin={() => setPage('login')} />
  }

  return (
    <LoginPage
      appContext={appContext}
      onNavigateToRegister={() => setPage('register')}
      onNavigateToForgotPassword={() => setPage('forgot-password')}
    />
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginFlow />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
