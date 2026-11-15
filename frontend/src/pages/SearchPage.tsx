import SearchForm from '../features/exercises/SearchForm'

function SearchPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Rechercher un exercice
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
        Choisissez une série, une matière et une notion pour retrouver les
        exercices du bac.
      </p>
      <SearchForm />
    </section>
  )
}

export default SearchPage
