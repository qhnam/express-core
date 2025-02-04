import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AppDataSource } from '../../../config/ormconfig';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashUtil } from '../../../common/utils/hash.utils';
import { USER_STATUS, USER_STATUS_CODE } from '../user.constant';
import { ErrorException } from '../../../config/error-exception';

export class UserService {
  private readonly userRepo: Repository<UserEntity>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(UserEntity);
  }

  async findOne(id: number) {
    const user = await this.userRepo
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
    if (!user) {
      throw new ErrorException(
        USER_STATUS_CODE.USER_NOT_FOUND,
        'User not found'
      );
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const checkUser = await this.userRepo
      .createQueryBuilder('users')
      .where('users.email = :email or users.username = :username', {
        username: dto.username,
        email: dto.email,
      })
      .getExists();

    if (checkUser) {
      throw new ErrorException(
        USER_STATUS_CODE.USER_ALREADY_EXISTS,
        'User already exists'
      );
    }
    const entity = new UserEntity();
    entity.email = dto.email;
    entity.fullname = dto.fullname;
    entity.username = dto.username;
    entity.password = await HashUtil.hashPassword(dto.password);
    entity.status = USER_STATUS.INACTIVE;

    const { password, deletedAt, ...newEntity } =
      await this.userRepo.save(entity);

    return newEntity;
  }
}
