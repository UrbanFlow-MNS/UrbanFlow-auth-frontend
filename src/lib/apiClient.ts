const API_URL = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
  status: number
  body: unknown

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`)
    this.status = status
    this.body = body
  }
}

function buildHeaders(init?: RequestInit): HeadersInit {
  const headers = new Headers(init?.headers)
  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json')
  }
  return headers
}

export async function apiClient<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, {
    credentials: 'include',
    ...init,
    headers: buildHeaders(init),
  })

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null)

  if (!res.ok) {
    throw new ApiError(res.status, body)
  }

  return body as T
}
