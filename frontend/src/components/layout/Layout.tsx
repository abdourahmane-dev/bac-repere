import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="rounded-sm text-lg font-semibold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            BacRepère
          </Link>
          <span className="text-xs text-slate-500 sm:text-sm">
            Exercices du bac
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 text-xs text-slate-500 sm:px-6 sm:text-sm">
          BacRepère — réviser avec les exercices du bac.
        </div>
      </footer>
    </div>
  )
}

export default Layout
