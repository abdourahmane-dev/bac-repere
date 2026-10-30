import { prisma } from "../config/prisma.js";

type ExerciseFilters = {
  topicId: number;
  subjectId: number;
  seriesId: number;
};

export const listExercises = async ({ topicId, subjectId, seriesId }: ExerciseFilters) => {
  return prisma.exercise.findMany({
    where: {
      topic: {
        id: topicId,
        subjectId,
        series: {
          some: {
            id: seriesId,
          },
        },
      },
      exam: {
        subjectId,
        seriesId,
      },
    },
    orderBy: [{ exam: { year: "desc" } }, { exerciseNumber: "asc" }],
  });
};
