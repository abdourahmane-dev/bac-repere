import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  getExercises,
  type ExerciseSummary,
} from '../../api/exercisesApi'
import type { Pagination } from '../../config/apiClient'
import { getErrorMessage } from '../../utils/getErrorMessage'

const parseId = (value: string | null) => {
  if (value === null) {
    return null
  }

  const id = Number(value)

  return Number.isInteger(id) && id > 0 ? id : null
}

type ExerciseQueryResult = {
  key: string
  exercises: ExerciseSummary[]
  pagination: Pagination | null
  error: string | null
}

export function useExercises() {
  const [searchParams, setSearchParams] = useSearchParams()

  const seriesId = parseId(searchParams.get('serie'))
  const subjectId = parseId(searchParams.get('matiere'))
  const topicId = parseId(searchParams.get('notion'))
  const page = parseId(searchParams.get('page')) ?? 1

  const hasSearch =
    seriesId !== null && subjectId !== null && topicId !== null

  const requestKey = hasSearch
    ? `${seriesId}:${subjectId}:${topicId}:${page}`
    : null

  const [result, setResult] = useState<ExerciseQueryResult | null>(null)

  useEffect(() => {
    if (
      requestKey === null ||
      seriesId === null ||
      subjectId === null ||
      topicId === null
    ) {
      return
    }

    let cancelled = false

    getExercises({ seriesId, subjectId, topicId }, page)
      .then((response) => {
        if (cancelled) {
          return
        }

        setResult({
          key: requestKey,
          exercises: response.data,
          pagination: response.pagination,
          error: null,
        })
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setResult({
          key: requestKey,
          exercises: [],
          pagination: null,
          error: getErrorMessage(error),
        })
      })

    return () => {
      cancelled = true
    }
  }, [requestKey, seriesId, subjectId, topicId, page])

  const isCurrent = result !== null && result.key === requestKey

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage === page) {
      return
    }

    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextPage === 1) {
      nextSearchParams.delete('page')
    } else {
      nextSearchParams.set('page', String(nextPage))
    }

    setSearchParams(nextSearchParams)
  }

  return {
    exercises: isCurrent ? result.exercises : [],
    pagination: isCurrent ? result.pagination : null,
    loading: requestKey !== null && !isCurrent,
    error: isCurrent ? result.error : null,
    hasSearch,
    goToPage,
  }
}
