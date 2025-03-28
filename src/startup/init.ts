import { Express } from "express";
import mongooseConnect from "../databases/mongodb/mongodb";

const appSetup = async (app: Express) => {
  try {
    await mongooseConnect();
    console.log("Databases connected successfully!");

    const APP_PORT = Number(process.env.APP_PORT) || 3000;
    app.listen(APP_PORT, () => {
      console.log(`Server started on port ${APP_PORT}`);
    });
  } catch (error: unknown) {
    console.log("Unable to start the app!");
    console.error(error);
  }
};

export default appSetup;
