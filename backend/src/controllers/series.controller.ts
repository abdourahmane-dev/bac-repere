import type { Request, Response } from "express";
import { getAllSeries } from "../services/series.service.js";

export const getSeries = async (req: Request, res: Response) => {
  try {
    const series = await getAllSeries();
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des séries" });
  }
};
