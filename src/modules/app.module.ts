import { Application } from 'express';
import { UserModule } from './users/user.module';

export class AppModule {
  constructor(private app: Application) {}

  init() {
    new UserModule(this.app).init();
  }
}
