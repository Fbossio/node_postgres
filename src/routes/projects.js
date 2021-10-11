import { Router } from "express";
import {
  createProject,
  getProject,
  getOneProject,
  deleteProject,
  updateProject,
} from "../controllers/projects.controller";

const router = Router();

// /api/projects/
router.post("/", createProject);
router.get("/", getProject);

// /api/projects/:project_id
router.get("/:id", getOneProject);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);

export default router;
