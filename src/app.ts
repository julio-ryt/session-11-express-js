import express from "express";
import appSetup from "./startup/init";
import dotenv from "dotenv";
import { routerSetup } from "./startup/router";
import securitySetup from "./startup/security";

dotenv.config();
const app = express();

appSetup(app);
securitySetup(app);
routerSetup(app);
