import {
  apiGet,
  apiGetPaginated,
  type PaginatedResult,
} from '../config/apiClient'

export type ExamSession = 'NORMAL' | 'REPLACEMENT'

export type ExerciseSummary = {
  id: number
  exerciseNumber: number
  statement: string | null
  statementFile: string | null
  topicId: number
  exam: {
    id: number
    year: number
    session: ExamSession
  }
}

export type ExerciseDetail = {
  id: number
  exerciseNumber: number
  statement: string | null
  statementFile: string | null
  correction: string | null
  correctionFile: string | null
  exam: {
    id: number
    year: number
    session: ExamSession
    series: {
      id: number
      name: string
    }
    subject: {
      id: number
      name: string
    }
  }
  topic: {
    id: number
    name: string
  }
}

export type ExerciseFilters = {
  seriesId: number
  subjectId: number
  topicId: number
}

export const getExercises = (
  filters: ExerciseFilters,
  page = 1,
  limit?: number,
): Promise<PaginatedResult<ExerciseSummary[]>> =>
  apiGetPaginated<ExerciseSummary[]>('/exercises', {
    seriesId: filters.seriesId,
    subjectId: filters.subjectId,
    topicId: filters.topicId,
    page,
    limit,
  })

export const getExerciseById = (id: number): Promise<ExerciseDetail> =>
  apiGet<ExerciseDetail>(`/exercises/${id}`)
