import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getSeries, type Series } from '../../api/seriesApi'
import { getSubjectsBySeries, type Subject } from '../../api/subjectsApi'
import { getTopicsBySubject, type Topic } from '../../api/topicsApi'

const parseId = (value: string | null) => {
  if (value === null) {
    return null
  }

  const id = Number(value)

  return Number.isInteger(id) && id > 0 ? id : null
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Une erreur est survenue.'

export function useExerciseFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [series, setSeries] = useState<Series[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [topics, setTopics] = useState<Topic[]>([])

  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(() =>
    parseId(searchParams.get('serie')),
  )
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    () => parseId(searchParams.get('matiere')),
  )
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(() =>
    parseId(searchParams.get('notion')),
  )

  const [loadingSeries, setLoadingSeries] = useState(true)
  const [loadingSubjects, setLoadingSubjects] = useState(false)
  const [loadingTopics, setLoadingTopics] = useState(false)

  const [seriesError, setSeriesError] = useState<string | null>(null)
  const [subjectsError, setSubjectsError] = useState<string | null>(null)
  const [topicsError, setTopicsError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    setLoadingSeries(true)
    setSeriesError(null)

    getSeries()
      .then((data) => {
        if (cancelled) {
          return
        }

        setSeries(data)
        setSelectedSeriesId((current) =>
          current !== null && data.some((item) => item.id === current)
            ? current
            : null,
        )
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setSeries([])
        setSeriesError(getErrorMessage(error))
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingSeries(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (selectedSeriesId === null) {
      setSubjects([])
      setSubjectsError(null)
      return
    }

    let cancelled = false

    setLoadingSubjects(true)
    setSubjectsError(null)

    getSubjectsBySeries(selectedSeriesId)
      .then((data) => {
        if (cancelled) {
          return
        }

        setSubjects(data)
        setSelectedSubjectId((current) =>
          current !== null && data.some((item) => item.id === current)
            ? current
            : null,
        )
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setSubjects([])
        setSelectedSubjectId(null)
        setSubjectsError(getErrorMessage(error))
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingSubjects(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [selectedSeriesId])

  useEffect(() => {
    if (selectedSeriesId === null || selectedSubjectId === null) {
      setTopics([])
      setTopicsError(null)
      return
    }

    let cancelled = false

    setLoadingTopics(true)
    setTopicsError(null)

    getTopicsBySubject(selectedSeriesId, selectedSubjectId)
      .then((data) => {
        if (cancelled) {
          return
        }

        setTopics(data)
        setSelectedTopicId((current) =>
          current !== null && data.some((item) => item.id === current)
            ? current
            : null,
        )
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setTopics([])
        setSelectedTopicId(null)
        setTopicsError(getErrorMessage(error))
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingTopics(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [selectedSeriesId, selectedSubjectId])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const seriesId = parseId(params.get('serie'))
      const subjectId = parseId(params.get('matiere'))

      setSelectedSeriesId(seriesId)
      setSelectedSubjectId(subjectId)
      setSelectedTopicId(parseId(params.get('notion')))
      setSubjects([])
      setTopics([])
      setSeriesError(null)
      setSubjectsError(null)
      setTopicsError(null)
      setLoadingSubjects(seriesId !== null)
      setLoadingTopics(subjectId !== null)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const clearSubmittedSearch = () => {
    if (searchParams.toString() !== '') {
      setSearchParams({}, { replace: true })
    }
  }

  const handleSeriesChange = (seriesId: number | null) => {
    setSelectedSeriesId(seriesId)
    setSelectedSubjectId(null)
    setSelectedTopicId(null)
    setSubjects([])
    setTopics([])
    setSubjectsError(null)
    setTopicsError(null)
    setLoadingSubjects(seriesId !== null)
    setLoadingTopics(false)
    clearSubmittedSearch()
  }

  const handleSubjectChange = (subjectId: number | null) => {
    setSelectedSubjectId(subjectId)
    setSelectedTopicId(null)
    setTopics([])
    setTopicsError(null)
    setLoadingTopics(subjectId !== null)
    clearSubmittedSearch()
  }

  const handleTopicChange = (topicId: number | null) => {
    setSelectedTopicId(topicId)
    clearSubmittedSearch()
  }

  const canSearch =
    selectedSeriesId !== null &&
    selectedSubjectId !== null &&
    selectedTopicId !== null

  const submit = () => {
    if (
      selectedSeriesId === null ||
      selectedSubjectId === null ||
      selectedTopicId === null
    ) {
      return
    }

    setSearchParams({
      serie: String(selectedSeriesId),
      matiere: String(selectedSubjectId),
      notion: String(selectedTopicId),
    })
  }

  const submitted =
    parseId(searchParams.get('serie')) !== null &&
    parseId(searchParams.get('matiere')) !== null &&
    parseId(searchParams.get('notion')) !== null

  const error = seriesError ?? subjectsError ?? topicsError

  return {
    series,
    subjects,
    topics,
    selectedSeriesId,
    selectedSubjectId,
    selectedTopicId,
    loadingSeries,
    loadingSubjects,
    loadingTopics,
    error,
    canSearch,
    submitted,
    handleSeriesChange,
    handleSubjectChange,
    handleTopicChange,
    submit,
  }
}
