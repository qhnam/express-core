import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { DatabaseService } from './config/database.service';

const bootstrap = async () => {
  const app = express();

  // Initialize TypeORM
  await DatabaseService.initialize();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

bootstrap();
