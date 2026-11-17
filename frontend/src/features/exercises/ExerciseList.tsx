import type { ExerciseSummary } from '../../api/exercisesApi'
import ExerciseCard from './ExerciseCard'

type ExerciseListProps = {
  exercises: ExerciseSummary[]
  seriesName?: string
  subjectName?: string
  topicName?: string
}

function ExerciseList({
  exercises,
  seriesName,
  subjectName,
  topicName,
}: ExerciseListProps) {
  return (
    <ul className="mt-3 flex flex-col gap-3">
      {exercises.map((exercise) => (
        <li key={exercise.id}>
          <ExerciseCard
            exercise={exercise}
            seriesName={seriesName}
            subjectName={subjectName}
            topicName={topicName}
          />
        </li>
      ))}
    </ul>
  )
}

export default ExerciseList
