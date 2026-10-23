import { prisma } from "../config/prisma.js";

export const getTopics = async (subjectId: number, seriesId: number) => {
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
