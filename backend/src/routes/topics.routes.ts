import { Router } from "express";
import { getTopics } from "../controllers/topics.controller.js";

const router = Router();

router.get("/", getTopics);

export default router;