import { existsSync, readFile, writeFile } from "fs";
import { TTask } from "../types";

const TASK_FILE = "tasks.json";

export const getAllFile = async () => {
  try {
    const isFileCreated = existsSync(TASK_FILE);
    if (!isFileCreated) {
      createEmptyFile();
      return [];
    }
    return await readTaskFile();
  } catch (err) {
    throw err;
  }
};

export const saveTaskFile = async (data: TTask) => {
  const tasksDB = (await readTaskFile()) as TTask[];
  const merged = tasksDB.length > 0 ? tasksDB.concat(data) : [{ ...data }];
  if (tasksDB.findIndex((task) => task.id === data.id) >= 0) {
    return "There is a task with that id";
  }
  return saveFile(merged);
};

const readTaskFile = async () => {
  return new Promise((resolve, reject) => {
    readFile(TASK_FILE, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        const tasks: TTask[] = data ? JSON.parse(data) : [];
        resolve(tasks);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
};

const createEmptyFile = () => {
  writeFile(TASK_FILE, "", "utf8", (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("File Created");
    }
  });
};

const saveFile = (data: TTask[]) => {
  return new Promise((resolve, reject) => {
    writeFile(TASK_FILE, JSON.stringify(data), "utf8", (err) => {
      if (err) {
        reject(err);
      }
      resolve("Execution success");
    });
  });
};

export const updateTaskFile = async (taskId: number, data: TTask) => {
  try {
    const tasksDB = (await readTaskFile()) as TTask[];
    const taskFound = tasksDB.findIndex((task) => task.id === taskId);
    if (taskFound === -1 || tasksDB[taskFound] === undefined) {
      return "There is no with that id";
    }
    tasksDB[taskFound].id = data.id;
    tasksDB[taskFound].name = data.name;
    tasksDB[taskFound].deadline = data.deadline;
    tasksDB[taskFound].description = data.description;
    return saveFile(tasksDB);
  } catch (err) {
    throw err;
  }
};

export const deleteTaskFile = async (taskId: number) => {
  try {
    const task = (await readTaskFile()) as TTask[];
    const taskFound = task.findIndex((value) => value.id === taskId);
    if (taskFound === -1) {
      return `No Task found with that id: ${taskId}`;
    }
    const updated = task.filter((value) => value.id !== taskId);
    return saveFile(updated);
  } catch (err) {
    throw err;
  }
};
