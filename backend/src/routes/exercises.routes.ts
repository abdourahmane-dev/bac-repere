import { Router } from "express";
import {
  getExercise,
  getExercises,
} from "../controllers/exercises.controller.js";

const router = Router();
router.get("/", getExercises);
router.get("/:id", getExercise);

export default router;
