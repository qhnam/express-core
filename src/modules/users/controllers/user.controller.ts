import { Request, Response } from 'express';
import { Controller, Get, Post } from '../../../common/decorators';
import { validationMiddleware } from '../../../common/middlewares/validation.middleware';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('/api/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('/:id')
  async getUsers(req: Request, res: Response) {
    return res.json(await this.userService.findOne(Number(req.params.id)));
  }

  @Post('/', [validationMiddleware(CreateUserDto)])
  async postUser(req: Request, res: Response) {
    return res.json(await this.userService.create(req.body));
  }
}
