import { connect } from "mongoose";

export default async function mongooseConnect(): Promise<void> {
  const mongoDB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
  await connect(mongoDB_URI);
}
