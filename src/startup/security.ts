import { Express, json } from "express";
const securitySetup = (app: Express) => app.use(json());

export default securitySetup;
