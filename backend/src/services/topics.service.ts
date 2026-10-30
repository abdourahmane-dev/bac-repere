import { prisma } from "../config/prisma.js";

type TopicFilters = {
  subjectId: number;
  seriesId: number;
};

export const listTopics = async ({ subjectId, seriesId }: TopicFilters) => {
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
