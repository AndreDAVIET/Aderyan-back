import expressLoader from './express';
import { Application } from 'express';
import * as dotenv from "dotenv";

dotenv.config();

export default async (app: Application ) => {
  await expressLoader(app);
  console.log('Express Intialized');

  // Rajouter le loader MySQL
};
