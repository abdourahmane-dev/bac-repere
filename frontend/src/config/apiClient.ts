const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

type ApiEnvelope<T> = {
  data: T
}

export type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export type PaginatedResult<T> = {
  data: T
  pagination: Pagination
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

const request = async <T>(
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

  return (await response.json()) as T
}

export const apiGet = async <T>(
  path: string,
  params?: QueryParams,
): Promise<T> => {
  const body = await request<ApiEnvelope<T>>(path, params)

  return body.data
}

export const apiGetPaginated = <T>(
  path: string,
  params?: QueryParams,
): Promise<PaginatedResult<T>> => request<PaginatedResult<T>>(path, params)
