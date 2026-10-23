import type { Request, Response } from "express";
import { getSubjectsBySeries } from "../services/subjects.service.js";

export const getSubjects = async (req: Request, res: Response) => {
  const seriesIdParam = req.query.seriesId;

  if (!seriesIdParam) {
    res.status(400).json({ message: "Le paramètre seriesId est obligatoire." });
    return;
  }

  const seriesId = Number(seriesIdParam);
  if (isNaN(seriesId)) {
    res.status(400).json({ message: "Le paramètre seriesId doit être un nombre valide." });
    return;
  }

  const subjects = await getSubjectsBySeries(seriesId);
  res.json(subjects);
};
