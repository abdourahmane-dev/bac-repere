import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    if (err.status >= 500) {
      console.error("Erreur serveur :", err.message);
    }

    res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  console.error("Erreur serveur :", err.message);

  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Une erreur inattendue est survenue sur le serveur.",
    },
  });
};
