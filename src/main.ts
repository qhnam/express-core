import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { DatabaseService } from './config/database.service';
import { loggerMiddleware } from './common/middlewares/logger.middleware';

const bootstrap = async () => {
  const app = express();

  // Initialize TypeORM
  await DatabaseService.initialize();

  app.use(express.json());
  app.use(loggerMiddleware);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  app.get('/test', (req, res) => {
    res.send({
      a: 1,
    });
  });
};

bootstrap();
