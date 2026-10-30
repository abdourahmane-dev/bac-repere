import { prisma } from "../config/prisma.js";

type SubjectFilters = {
  seriesId: number;
};

export const listSubjectsBySeries = async ({ seriesId }: SubjectFilters) => {
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
