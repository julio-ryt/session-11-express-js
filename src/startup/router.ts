import { Express } from "express";

import taskRouter from "../routes/task.router";

export const routerSetup = (app: Express) => app.use("/task", taskRouter);
