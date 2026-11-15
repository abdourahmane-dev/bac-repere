import FilterSelect, { type FilterOption } from '../../components/FilterSelect'
import { useExerciseFilters } from './useExerciseFilters'

function SearchForm() {
  const {
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
  } = useExerciseFilters()

  const seriesOptions: FilterOption[] = series.map((item) => ({
    value: item.id,
    label: item.name,
  }))
  const subjectOptions: FilterOption[] = subjects.map((item) => ({
    value: item.id,
    label: item.name,
  }))
  const topicOptions: FilterOption[] = topics.map((item) => ({
    value: item.id,
    label: item.name,
  }))

  const selectedSeries = series.find((item) => item.id === selectedSeriesId)
  const selectedSubject = subjects.find((item) => item.id === selectedSubjectId)
  const selectedTopic = topics.find((item) => item.id === selectedTopicId)

  const summary =
    submitted && selectedSeries && selectedSubject && selectedTopic
      ? `${selectedSeries.name} · ${selectedSubject.name} · ${selectedTopic.name}`
      : null

  return (
    <form
      className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <FilterSelect
          id="series"
          label="Série"
          placeholder={
            !loadingSeries && series.length === 0
              ? 'Aucune série disponible'
              : 'Choisir une série'
          }
          value={selectedSeriesId}
          options={seriesOptions}
          disabled={!loadingSeries && series.length === 0}
          loading={loadingSeries}
          onChange={handleSeriesChange}
        />

        <FilterSelect
          id="subject"
          label="Matière"
          placeholder={
            selectedSeriesId === null
              ? "Choisissez d'abord une série"
              : !loadingSubjects && subjects.length === 0
                ? 'Aucune matière disponible'
                : 'Choisir une matière'
          }
          value={selectedSubjectId}
          options={subjectOptions}
          disabled={
            selectedSeriesId === null ||
            (!loadingSubjects && subjects.length === 0)
          }
          loading={loadingSubjects}
          onChange={handleSubjectChange}
        />

        <FilterSelect
          id="topic"
          label="Notion"
          placeholder={
            selectedSubjectId === null
              ? "Choisissez d'abord une matière"
              : !loadingTopics && topics.length === 0
                ? 'Aucune notion disponible'
                : 'Choisir une notion'
          }
          value={selectedTopicId}
          options={topicOptions}
          disabled={
            selectedSubjectId === null ||
            (!loadingTopics && topics.length === 0)
          }
          loading={loadingTopics}
          onChange={handleTopicChange}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500 sm:text-sm">
          Choisissez les trois filtres pour lancer la recherche.
        </p>
        <button
          type="submit"
          disabled={!canSearch}
          className="min-h-11 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 sm:w-auto"
        >
          Rechercher
        </button>
      </div>

      {summary && (
        <p
          role="status"
          className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600"
        >
          Recherche : <span className="font-medium text-slate-900">{summary}</span>
        </p>
      )}
    </form>
  )
}

export default SearchForm
