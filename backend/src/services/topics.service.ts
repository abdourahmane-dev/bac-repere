import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";

type TopicFilters = {
  subjectId: number;
  seriesId: number;
};

export const listTopics = async ({ subjectId, seriesId }: TopicFilters) => {
  const context = await prisma.subject.findFirst({
    where: {
      id: subjectId,
      series: {
        some: {
          id: seriesId,
        },
      },
    },
    select: { id: true },
  });

  if (!context) {
    throw new AppError(
      404,
      "NOT_FOUND",
      "La matière demandée est introuvable pour cette série."
    );
  }

  return prisma.topic.findMany({
    where: {
      subjectId,
      series: {
        some: {
          id: seriesId,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};
