import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  getOneTask,
  getTaskByProject,
} from "../controllers/tasks.controller";

const router = Router();

// /api/tasks/

router.post("/", createTask);
router.get("/", getTasks);

// /api/tasks/:id
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.get("/:id", getOneTask);

// /api/tasls/project/:projectid
router.get("/project/:projectid", getTaskByProject);

export default router;
