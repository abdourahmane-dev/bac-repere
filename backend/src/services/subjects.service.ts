import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";

type SubjectFilters = {
  seriesId: number;
};

export const listSubjectsBySeries = async ({ seriesId }: SubjectFilters) => {
  const series = await prisma.series.findUnique({
    where: { id: seriesId },
    select: { id: true },
  });

  if (!series) {
    throw new AppError(404, "NOT_FOUND", "La série demandée est introuvable.");
  }

  return prisma.subject.findMany({
    where: {
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
