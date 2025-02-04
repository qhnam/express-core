import { Application } from 'express';
import { UserModule } from './users/user.module';
import { UserController } from './users/controllers/user.controller';
import { registerControllers } from '../common/decorators/registerControllers';

export class AppModule {
  constructor(private app: Application) {}

  init() {
    new UserModule(this.app);

    // Register all controller
    registerControllers(this.app, [UserController]);
  }
}
