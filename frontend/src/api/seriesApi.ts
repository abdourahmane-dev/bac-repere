import { apiGet } from '../config/apiClient'

export type Series = {
  id: number
  name: string
}

export const getSeries = () => apiGet<Series[]>('/series')
