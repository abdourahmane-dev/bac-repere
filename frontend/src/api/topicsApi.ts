import { apiGet } from '../config/apiClient'

export type Topic = {
  id: number
  name: string
  subjectId: number
}

export const getTopicsBySubject = (seriesId: number, subjectId: number) =>
  apiGet<Topic[]>('/topics', { seriesId, subjectId })
