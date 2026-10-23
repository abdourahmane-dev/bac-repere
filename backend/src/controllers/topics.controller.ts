import type { Request, Response } from "express";
import { getTopics } from "../services/topics.service.js";

export const getTopicsHandler = async (req: Request, res: Response) => {
  const subjectIdParam = req.query.subjectId;
  const seriesIdParam = req.query.seriesId;

  if (!subjectIdParam || !seriesIdParam) {
    res.status(400).json({
      message: "Les paramètres subjectId et seriesId sont obligatoires.",
    });
    return;
  }

  const subjectId = Number(subjectIdParam);
  const seriesId = Number(seriesIdParam);

  if (isNaN(subjectId) || isNaN(seriesId)) {
    res.status(400).json({
      message: "Les paramètres subjectId et seriesId doivent être des nombres valides.",
    });
    return;
  }

  const topics = await getTopics(subjectId, seriesId);
  res.json(topics);
};
