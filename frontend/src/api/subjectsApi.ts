import { apiGet } from '../config/apiClient'

export type Subject = {
  id: number
  name: string
}

export const getSubjectsBySeries = (seriesId: number) =>
  apiGet<Subject[]>('/subjects', { seriesId })
