import { Router } from "express";
import {
  getTasks,
  saveTask,
  deleteTask,
  updateTask,
} from "../controller/task.controller";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.post("/", saveTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
