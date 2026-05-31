import { useSearchParams } from 'react-router-dom'

export type AppContext = 'user' | 'admin' | 'incident' | 'monitoring'

const VALID: AppContext[] = ['user', 'admin', 'incident', 'monitoring']

export function useAppContext(): AppContext | null {
  const [searchParams] = useSearchParams()
  const app = searchParams.get('app')
  return VALID.includes(app as AppContext) ? (app as AppContext) : null
}
