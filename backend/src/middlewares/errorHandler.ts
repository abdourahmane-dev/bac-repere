import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Erreur serveur :", err.message);

  res.status(500).json({
    message: "Une erreur inattendue est survenue sur le serveur.",
  });
};
