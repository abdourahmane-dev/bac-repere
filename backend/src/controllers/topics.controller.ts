import type { Request, Response } from "express";
import { listTopics } from "../services/topics.service.js";
import { parsePositiveIntFields } from "../utils/query.js";

export const getTopics = async (req: Request, res: Response) => {
  const { subjectId, seriesId } = parsePositiveIntFields(req.query, [
    "subjectId",
    "seriesId",
  ]);

  const topics = await listTopics({ subjectId, seriesId });
  res.json(topics);
};
