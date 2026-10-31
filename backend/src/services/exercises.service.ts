import { prisma } from "../config/prisma.js";

type ExerciseFilters = {
  topicId: number;
  subjectId: number;
  seriesId: number;
  page: number;
  limit: number;
};

export const listExercises = async ({
  topicId,
  subjectId,
  seriesId,
  page,
  limit,
}: ExerciseFilters) => {
  const where = {
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
  };

  const [data, total] = await prisma.$transaction([
    prisma.exercise.findMany({
      where,
      orderBy: [
        { exam: { year: "desc" } },
        { exam: { session: "asc" } },
        { exerciseNumber: "asc" },
        { id: "asc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.exercise.count({ where }),
  ]);

  return { data, total };
};
