import { Link } from 'react-router-dom'
import type { ExerciseSummary } from '../../api/exercisesApi'
import { sessionLabels } from './sessionLabels'

type ExerciseCardProps = {
  exercise: ExerciseSummary
  seriesName?: string
  subjectName?: string
  topicName?: string
}

function ExerciseCard({
  exercise,
  seriesName,
  subjectName,
  topicName,
}: ExerciseCardProps) {
  const context = [seriesName, subjectName, topicName]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
          {exercise.exam.year}
        </span>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
          {sessionLabels[exercise.exam.session]}
        </span>
        {context && <span className="text-slate-500">{context}</span>}
      </div>

      <h2 className="mt-3 text-base font-semibold text-slate-900 sm:text-lg">
        Exercice {exercise.exerciseNumber}
      </h2>

      {exercise.statement ? (
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {exercise.statement}
        </p>
      ) : (
        <p className="mt-2 text-sm text-slate-500 italic">
          Énoncé disponible en fichier.
        </p>
      )}

      <Link
        to={`/exercices/${exercise.id}`}
        className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-blue-700 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Ouvrir l'exercice
      </Link>
    </article>
  )
}

export default ExerciseCard
