import { Request, Response } from 'express';
import { Auth, Controller, Get, Post } from '../../../common/decorators';
import { UserService } from '../services/user.service';
import { validationMiddleware } from '../../../common/middlewares/validation.middleware';
import { SignInUserDto } from '../dtos/sign-in-user.dto';
import { CustomRequest } from '../../../common/interfaces/request.interface';

@Controller('auth')
export class AuthUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/sign-in', [validationMiddleware(SignInUserDto)])
  async signIn(req: Request, res: Response) {
    return res.json(await this.userService.signIn(req.body));
  }

  @Get('/me')
  @Auth()
  async getMe(req: CustomRequest, res: Response) {
    return res.json(await this.userService.getMe(req.userId));
  }
}
