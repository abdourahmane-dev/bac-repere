import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sessionLabels } from '../features/exercises/sessionLabels'
import { useExercise } from '../features/exercises/useExercise'

function ExerciseDetailPage() {
  const { exerciseId } = useParams()
  const parsedId = Number(exerciseId)
  const id = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null

  const { exercise, loading, error } = useExercise(id)
  const [showCorrection, setShowCorrection] = useState(false)

  if (loading) {
    return (
      <section aria-live="polite">
        <p className="text-sm text-slate-600">Chargement de l'exercice…</p>
      </section>
    )
  }

  if (!exercise) {
    return (
      <section>
        <Link
          to="/"
          className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          ← Retour à la recherche
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Exercice introuvable
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          {error ?? "L'exercice demandé n'existe pas ou n'est plus disponible."}
        </p>
      </section>
    )
  }

  const resultsParams = new URLSearchParams({
    serie: String(exercise.exam.series.id),
    matiere: String(exercise.exam.subject.id),
    notion: String(exercise.topic.id),
  })

  return (
    <section className="max-w-3xl">
      <Link
        to={`/exercices?${resultsParams.toString()}`}
        className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        ← Retour aux exercices
      </Link>

      <p className="mt-4 text-sm font-medium text-blue-700">
        BAC {exercise.exam.series.name} — {exercise.exam.subject.name} —{' '}
        {exercise.exam.year}
      </p>

      <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Exercice {exercise.exerciseNumber}
      </h1>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
          {exercise.topic.name}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
          {sessionLabels[exercise.exam.session]}
        </span>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Énoncé
        </h2>
        {exercise.statement ? (
          <p className="mt-3 text-sm leading-7 whitespace-pre-line text-slate-700 sm:text-base">
            {exercise.statement}
          </p>
        ) : (
          <p className="mt-3 text-sm text-slate-500 italic">
            {exercise.statementFile
              ? "L'énoncé est disponible dans un fichier séparé."
              : "L'énoncé n'est pas disponible."}
          </p>
        )}
      </section>

      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            Correction
          </h2>

          {exercise.correction && (
            <button
              type="button"
              onClick={() =>
                setShowCorrection(prev => !prev)
              }
              aria-expanded={showCorrection}
              aria-controls="correction-content"
              className="min-h-11 rounded-lg border border-blue-700 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              {showCorrection ? 'Masquer la correction' : 'Voir la correction'}
            </button>
          )}
        </div>

        {showCorrection && exercise.correction && (
          <p
            id="correction-content"
            className="mt-3 border-t border-slate-100 pt-3 text-sm leading-7 whitespace-pre-line text-slate-700 sm:text-base"
          >
            {exercise.correction}
          </p>
        )}

        {!exercise.correction && (
          <p className="mt-3 text-sm text-slate-500 italic">
            {exercise.correctionFile
              ? 'La correction est disponible dans un fichier séparé.'
              : "La correction n'est pas encore disponible."}
          </p>
        )}
      </section>
    </section>
  )
}

export default ExerciseDetailPage
