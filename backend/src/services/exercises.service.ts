import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";

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
  const context = await prisma.topic.findFirst({
    where: {
      id: topicId,
      subjectId,
      series: {
        some: {
          id: seriesId,
        },
      },
      subject: {
        series: {
          some: {
            id: seriesId,
          },
        },
      },
    },
    select: { id: true },
  });

  if (!context) {
    throw new AppError(
      404,
      "NOT_FOUND",
      "La notion demandée est introuvable pour cette matière et cette série."
    );
  }

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
