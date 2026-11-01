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
      select: {
        id: true,
        exerciseNumber: true,
        statement: true,
        statementFile: true,
        topicId: true,
        exam: {
          select: {
            id: true,
            year: true,
            session: true,
          },
        },
      },
    }),
    prisma.exercise.count({ where }),
  ]);

  return { data, total };
};

export const getExerciseById = async (id: number) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id },
    select: {
      id: true,
      exerciseNumber: true,
      statement: true,
      statementFile: true,
      correction: true,
      correctionFile: true,
      exam: {
        select: {
          id: true,
          year: true,
          session: true,
          series: {
            select: {
              id: true,
              name: true,
            },
          },
          subject: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      topic: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!exercise) {
    throw new AppError(
      404,
      "NOT_FOUND",
      "L'exercice demandé est introuvable."
    );
  }

  return exercise;
};
