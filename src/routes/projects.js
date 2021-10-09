import { Router } from "express";
import { createProject } from "../controllers/projects.controller";

const router = Router();

// /api/projects
router.post('/', createProject)

export default router;
