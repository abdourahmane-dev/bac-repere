const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

type ApiEnvelope<T> = {
  data: T
}

type ApiErrorBody = {
  error: {
    message: string
  }
}

type QueryParams = Record<string, string | number | undefined>

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const isApiErrorBody = (body: unknown): body is ApiErrorBody => {
  if (typeof body !== 'object' || body === null || !('error' in body)) {
    return false
  }

  const { error } = body

  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  )
}

const buildQuery = (params?: QueryParams) => {
  if (!params) {
    return ''
  }

  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value))
    }
  }

  const query = searchParams.toString()

  return query ? `?${query}` : ''
}

export const apiGet = async <T>(
  path: string,
  params?: QueryParams,
): Promise<T> => {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}${buildQuery(params)}`)
  } catch {
    throw new ApiError(
      0,
      'Impossible de contacter le serveur. Vérifiez votre connexion.',
    )
  }

  if (!response.ok) {
    let message = 'Une erreur est survenue.'

    try {
      const body: unknown = await response.json()

      if (isApiErrorBody(body)) {
        message = body.error.message
      }
    } catch {
      // La réponse d'erreur n'est pas du JSON : on garde le message générique.
    }

    throw new ApiError(response.status, message)
  }

  const body = (await response.json()) as ApiEnvelope<T>

  return body.data
}
