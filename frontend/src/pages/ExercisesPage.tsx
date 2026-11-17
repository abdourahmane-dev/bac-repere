import { Link, Navigate, useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import ExerciseList from '../features/exercises/ExerciseList'
import { useExerciseFilters } from '../features/exercises/useExerciseFilters'
import { useExercises } from '../features/exercises/useExercises'

function ExercisesPage() {
  const filters = useExerciseFilters()
  const { exercises, pagination, loading, error, hasSearch, goToPage } =
    useExercises()
  const [searchParams] = useSearchParams()

  const selectedSeries = filters.series.find(
    (item) => item.id === filters.selectedSeriesId,
  )
  const selectedSubject = filters.subjects.find(
    (item) => item.id === filters.selectedSubjectId,
  )
  const selectedTopic = filters.topics.find(
    (item) => item.id === filters.selectedTopicId,
  )

  const editParams = new URLSearchParams()

  for (const key of ['serie', 'matiere', 'notion']) {
    const value = searchParams.get(key)

    if (value) {
      editParams.set(key, value)
    }
  }

  const editQuery = editParams.toString()
  const editSearch = editQuery ? `/?${editQuery}` : '/'

  if (!hasSearch) {
    return <Navigate to="/" replace />
  }

  const context = [
    selectedSeries?.name,
    selectedSubject?.name,
    selectedTopic?.name,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <section>
      <Link
        to={editSearch}
        className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        ← Modifier la recherche
      </Link>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        Exercices
      </h1>
      {context && (
        <p className="mt-1 text-sm text-slate-600 sm:text-base">{context}</p>
      )}

      <div className="mt-6" aria-live="polite">
        {loading && (
          <p className="text-sm text-slate-600">Recherche des exercices…</p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {!loading && !error && pagination && (
          <p className="text-sm text-slate-600">
            {pagination.total === 0
              ? 'Aucun exercice trouvé pour ces critères.'
              : `${pagination.total} exercice${pagination.total > 1 ? 's' : ''} trouvé${pagination.total > 1 ? 's' : ''}.`}
          </p>
        )}
      </div>

      {!loading && !error && pagination && pagination.total > 0 && (
        <>
          <ExerciseList
            exercises={exercises}
            seriesName={selectedSeries?.name}
            subjectName={selectedSubject?.name}
            topicName={selectedTopic?.name}
          />

          {pagination.totalPages > 1 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              hasPrevious={pagination.hasPrevious}
              hasNext={pagination.hasNext}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </section>
  )
}

export default ExercisesPage
