import { prisma } from "../config/prisma.js";

export const listSeries = async () => {
  return prisma.series.findMany({
    orderBy: {name: "asc"}
  });
};
