import type { Request, Response } from "express";
import { listExercises } from "../services/exercises.service.js";
import { parsePositiveInt } from "../utils/parsePositiveInt.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const parseOptionalPositiveInt = (value: unknown, defaultValue: number) => {
  if (value === undefined) {
    return defaultValue;
  }

  return parsePositiveInt(value);
};

export const getExercises = async (req: Request, res: Response) => {
  const topicId = parsePositiveInt(req.query.topicId);
  const subjectId = parsePositiveInt(req.query.subjectId);
  const seriesId = parsePositiveInt(req.query.seriesId);

  if (topicId === null || subjectId === null || seriesId === null) {
    res.status(400).json({
      message:
        "Les paramètres topicId, subjectId et seriesId sont obligatoires, uniques et doivent être des nombres entiers positifs.",
    });
    return;
  }

  const page = parseOptionalPositiveInt(req.query.page, DEFAULT_PAGE);
  const limit = parseOptionalPositiveInt(req.query.limit, DEFAULT_LIMIT);

  if (page === null || limit === null || limit > MAX_LIMIT) {
    res.status(400).json({
      message: `Les paramètres page et limit doivent être des nombres entiers positifs, avec limit compris entre 1 et ${MAX_LIMIT}.`,
    });
    return;
  }

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
