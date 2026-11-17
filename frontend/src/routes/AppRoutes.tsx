import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ExerciseDetailPage from '../pages/ExerciseDetailPage'
import ExercisesPage from '../pages/ExercisesPage'
import SearchPage from '../pages/SearchPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route path="exercices" element={<ExercisesPage />} />
        <Route path="exercices/:exerciseId" element={<ExerciseDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
