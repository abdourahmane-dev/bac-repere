import type { Request, Response } from "express";
import { listSeries } from "../services/series.service.js";

export const getSeries = async (_req: Request, res: Response) => {
  const series = await listSeries();
  res.json({ data: series });
};
