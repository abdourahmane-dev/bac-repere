import type { Request, Response } from "express";
import { listExercises } from "../services/exercises.service.js";
import { parsePositiveInt } from "../utils/parsePositiveInt.js";

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

  const exercises = await listExercises({ topicId, subjectId, seriesId });
  res.json(exercises);
};
