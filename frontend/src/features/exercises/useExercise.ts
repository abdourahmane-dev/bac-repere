import { useEffect, useState } from 'react'
import {
  getExerciseById,
  type ExerciseDetail,
} from '../../api/exercisesApi'
import { getErrorMessage } from '../../utils/getErrorMessage'

type ExerciseQueryResult = {
  id: number
  exercise: ExerciseDetail | null
  error: string | null
}

export function useExercise(id: number | null) {
  const [result, setResult] = useState<ExerciseQueryResult | null>(null)

  useEffect(() => {
    if (id === null) {
      return
    }

    let cancelled = false

    getExerciseById(id)
      .then((exercise) => {
        if (cancelled) {
          return
        }

        setResult({ id, exercise, error: null })
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setResult({ id, exercise: null, error: getErrorMessage(error) })
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const isCurrent = id !== null && result !== null && result.id === id

  return {
    exercise: isCurrent ? result.exercise : null,
    loading: id !== null && !isCurrent,
    error:
      id === null
        ? 'Exercice introuvable.'
        : isCurrent
          ? result.error
          : null,
  }
}
