import { Router } from "express";
import { getSeries } from "../controllers/series.controller.js";

const router = Router();

router.get("/", getSeries);

export default router;
