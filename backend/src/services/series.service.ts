import { prisma } from "../config/prisma.js";

export const getAllSeries = async () => {
  return prisma.series.findMany();
};
