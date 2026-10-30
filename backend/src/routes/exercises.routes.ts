import { Router } from "express";
import { getExercises } from "../controllers/exercises.controller.js";

const router = Router();
router.get("/", getExercises);

export default router;
