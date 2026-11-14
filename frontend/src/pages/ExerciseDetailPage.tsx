import { Link, useParams } from 'react-router-dom'

function ExerciseDetailPage() {
  const { exerciseId } = useParams()

  return (
    <section>
      <Link
        to="/"
        className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        ← Retour à la recherche
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        Exercice {exerciseId}
      </h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        Le détail de l'exercice et sa correction seront affichés ici.
      </p>
    </section>
  )
}

export default ExerciseDetailPage
