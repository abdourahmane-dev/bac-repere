import { prisma } from "../config/prisma.js";

export const getSubjectsBySeries = async (seriesId: number) => {
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
