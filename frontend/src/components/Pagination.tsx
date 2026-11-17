type PaginationProps = {
  page: number
  totalPages: number
  hasPrevious: boolean
  hasNext: boolean
  onPageChange: (page: number) => void
}

function Pagination({
  page,
  totalPages,
  hasPrevious,
  hasNext,
  onPageChange,
}: PaginationProps) {
  return (
    <nav
      aria-label="Pagination des exercices"
      className="mt-6 flex items-center justify-between gap-3"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevious}
        className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        Précédent
      </button>

      <p className="text-sm text-slate-600">
        Page {page} sur {totalPages}
      </p>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        Suivant
      </button>
    </nav>
  )
}

export default Pagination
