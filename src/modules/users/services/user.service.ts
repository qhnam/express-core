import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AppDataSource } from '../../../config/ormconfig';
import { CreateUserDto } from '../dtos/create-user.dto';

export class UserService {
  private readonly userRepo: Repository<UserEntity>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(UserEntity);
  }

  async create(dto: CreateUserDto) {
    console.log('dto', dto);
  }
}
