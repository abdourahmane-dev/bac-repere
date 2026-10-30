import type { Request, Response } from "express";
import { listSubjectsBySeries } from "../services/subjects.service.js";
import { parsePositiveInt } from "../utils/parsePositiveInt.js";

export const getSubjects = async (req: Request, res: Response) => {
  const seriesId = parsePositiveInt(req.query.seriesId);

  if (seriesId === null) {
    res.status(400).json({
      message:
        "Le paramètre seriesId est obligatoire, unique et doit être un nombre entier positif.",
    });
    return;
  }

  const subjects = await listSubjectsBySeries({ seriesId });
  res.json(subjects);
};
