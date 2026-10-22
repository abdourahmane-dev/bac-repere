import type { Request, Response } from "express";
import { getAllSeries } from "../services/series.service.js";

export const getSeries = async (req: Request, res: Response) => {
  const series = await getAllSeries();
  res.json(series);
};

