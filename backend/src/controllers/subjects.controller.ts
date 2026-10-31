import type { Request, Response } from "express";
import { listSubjectsBySeries } from "../services/subjects.service.js";
import { parsePositiveIntFields } from "../utils/query.js";

export const getSubjects = async (req: Request, res: Response) => {
  const { seriesId } = parsePositiveIntFields(req.query, ["seriesId"]);
  const subjects = await listSubjectsBySeries({ seriesId });
  res.json(subjects);
};
