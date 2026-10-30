import type { Request, Response } from "express";
import { listTopics } from "../services/topics.service.js";
import { parsePositiveInt } from "../utils/parsePositiveInt.js";

export const getTopics = async (req: Request, res: Response) => {
  const subjectId = parsePositiveInt(req.query.subjectId);
  const seriesId = parsePositiveInt(req.query.seriesId);

  if (subjectId === null || seriesId === null) {
    res.status(400).json({
      message:
        "Les paramètres subjectId et seriesId sont obligatoires, uniques et doivent être des nombres entiers positifs.",
    });
    return;
  }

  const topics = await listTopics({ subjectId, seriesId });
  res.json(topics);
};
