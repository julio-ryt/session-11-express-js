import { Document } from "mongoose";

export interface ITask extends Document {
  id: number;
  name: string;
  deadline: string;
  description: string;
}
