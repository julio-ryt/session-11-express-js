import { Express, Response, Request } from "express";
import { existsSync, readFile, writeFile } from "fs";
import { TTask } from "../types";

const TASK_FILE = "tasks.json";

export const routerSetup = (app: Express) =>
  app
    .get("/", async (_req: Request, res: Response) => {
      getAllTasks(res);
    })
    .post("/", async (req: Request, res: Response) => {
      const task: TTask = req.body;

      if (Object.keys(task).length === 0) {
        res.status(404);
        res.send("You need to provide a task!");
      } else {
        readFile(TASK_FILE, (err, data) => saveTask(err, data, task, res));
      }
    });
export default routerSetup;

const createEmptyFile = () => {
  writeFile(TASK_FILE, "", "utf8", (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("File Created");
    }
  });
};

const saveTask = (
  err: NodeJS.ErrnoException | null,
  readData: Buffer<ArrayBufferLike>,
  data: TTask,
  res: Response
) => {
  if (err) {
    console.error("Error writing to file", err);
    res.status(500);
    res.send("Internal Server Error");
  }

  const tasks = readData.toString("utf8");
  const merged =
    tasks && typeof tasks === "string"
      ? (JSON.parse(tasks) as TTask[]).concat(data)
      : [{ ...data }];
  console.log("tasks", merged);
  writeFile(TASK_FILE, JSON.stringify(merged), "utf8", (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      res.status(201);
      res.send("Task Saved");
    }
  });
};

const getAllTasks = (res: Response) => {
  const isFileCreated = existsSync(TASK_FILE);
  const tasks: TTask[] = [];

  if (!isFileCreated) {
    createEmptyFile();
  }
  readFile(TASK_FILE, (err, data) => {
    if (err) throw err;
    const buffer = data.toString("utf8");
    if (buffer && typeof buffer === "string") {
      tasks.push(JSON.parse(buffer));
    }
    res.send({ data: tasks });
  });
};
