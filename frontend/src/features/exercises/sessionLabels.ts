import type { ExamSession } from '../../api/exercisesApi'

export const sessionLabels: Record<ExamSession, string> = {
  NORMAL: 'Session normale',
  REPLACEMENT: 'Session de remplacement',
}
