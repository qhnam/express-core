import { UserService } from '../services/user.service';

export class AuthUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
}
