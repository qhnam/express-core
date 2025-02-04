import 'reflect-metadata';
import express from 'express';
import { DatabaseService } from './config/database.service';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { AppModule } from './modules/app.module';
import { errorHandlerMiddleware } from './common/middlewares/error-handler.middleware';
import { ENV } from './config/environment';

const bootstrap = async () => {
  const app = express();

  // Initialize TypeORM
  await DatabaseService.initialize();

  app.use(express.json());
  app.use(loggerMiddleware);

  const appModule = new AppModule(app);
  appModule.init();

  app.use(errorHandlerMiddleware);

  app.listen(ENV.PORT, () => {
    console.log(`Server is running on http://localhost:${ENV.PORT}`);
  });

  app.get('/test', (req, res) => {
    res.send({
      a: 1,
    });
  });
};

bootstrap();
