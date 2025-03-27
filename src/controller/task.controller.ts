import { Request, Response } from "express";
import { TTask } from "../models/task.model";
import {
  getAllFile,
  saveTaskFile,
  updateTaskFile,
  deleteTaskFile,
} from "../services/task-file";

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const task = await getAllFile();
    res.json({ data: task });
  } catch (err) {
    res.status(404);
    res.send(`You need to provide a task! ${err}`);
  }
};

export const saveTask = async (req: Request, res: Response) => {
  try {
    const task: TTask = req.body;
    if (Object.keys(task).length === 0) {
      res.status(404);
      res.send("You need to provide a task!");
    } else {
      const isSaved = await saveTaskFile(task);
      res.send(isSaved);
    }
  } catch (err) {
    res.status(404);
    res.send(`You need to provide a task! ${err}`);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    if (req.params.id === undefined) {
      res.status(404);
      res.send("You need to provide a task!");
    }

    const isUpdated = await updateTaskFile(Number(req.params.id), req.body);
    res.send(isUpdated);
  } catch (err) {
    res.status(404);
    res.send(`You need to provide a task! ${err}`);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (req.params === undefined || req.params.id === undefined) {
      res.status(404);
      res.send("You need to provide a task id!");
    }

    const task = await deleteTaskFile(Number(req.params.id as string));
    res.json(task);
  } catch (err) {
    res.status(404);
    res.send(`You need to provide a task! ${err}`);
  }
};
