import { Router } from "express";
import { getTopicsHandler } from "../controllers/topics.controller.js";

const router = Router();

router.get("/", getTopicsHandler);

export default router;