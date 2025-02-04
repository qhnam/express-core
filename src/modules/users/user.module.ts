import { Application } from 'express';
import { registerControllers } from '../../common/decorators/registerControllers';
import { UserController } from './controllers/user.controller';
import { AuthUserController } from './controllers/auth-user.controller';

export class UserModule {
  constructor(private app: Application) {}

  init() {
    registerControllers(this.app, [UserController, AuthUserController]);
  }
}
