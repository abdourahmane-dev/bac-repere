import type { Request, Response } from "express";
import { listExercises } from "../services/exercises.service.js";
import { parsePagination, parsePositiveIntFields } from "../utils/query.js";

export const getExercises = async (req: Request, res: Response) => {
  const { topicId, subjectId, seriesId } = parsePositiveIntFields(req.query, [
    "topicId",
    "subjectId",
    "seriesId",
  ]);
  const { page, limit } = parsePagination(req.query);

  const { data, total } = await listExercises({
    topicId,
    subjectId,
    seriesId,
    page,
    limit,
  });

  const totalPages = Math.ceil(total / limit);

  res.set("Cache-Control", "no-store");
  res.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  });
};
