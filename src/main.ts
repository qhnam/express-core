import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
  const app = express();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

bootstrap();
