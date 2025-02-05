import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AppDataSource } from '../../../config/ormconfig';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashUtil } from '../../../common/utils/hash.utils';
import { USER_STATUS, USER_STATUS_CODE } from '../user.constant';
import { ErrorException } from '../../../config/error-exception';
import { SignInUserDto } from '../dtos/sign-in-user.dto';
import { generateToken } from '../../../common/utils/jwt.util';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import jwt from 'jsonwebtoken';
import { generateUserSecretKey } from '../../../common/utils/crypto.util';
import { ENV } from '../../../config/environment';

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

  async signIn(dto: SignInUserDto) {
    const user = await this.userRepo
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email: dto.email })
      .getOne();

    if (!user) {
      throw new ErrorException(
        USER_STATUS_CODE.USER_NOT_FOUND,
        'User not found'
      );
    }

    if (user.status !== USER_STATUS.ACTIVE) {
      throw new ErrorException(
        USER_STATUS_CODE.USER_NOT_ACTIVE,
        'User not active'
      );
    }

    const verifyInfo = await HashUtil.comparePassword(
      dto.password,
      user.password
    );

    if (!verifyInfo) {
      throw new ErrorException(
        USER_STATUS_CODE.INVALID_CREDENTIALS,
        'Email or password invalid'
      );
    }

    const { accessToken, refreshToken } = generateToken(user.id);
    const { password, ...returnUser } = user;
    return {
      accessToken,
      refreshToken,
      user: returnUser,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const decoded = jwt.decode(dto.refreshToken) as {
      userId: number;
      exp: number;
    };

    if (!decoded || !decoded.userId) {
      throw new ErrorException(
        'INVALID_REFRESH_TOKEN|403',
        'Invalid refresh token'
      );
    }

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      throw new ErrorException(
        'REFRESH_TOKEN_EXPIRED|403',
        'Refresh token expired'
      );
    }

    const userSecretKey = generateUserSecretKey(decoded.userId);

    try {
      const verifiedUser = jwt.verify(dto.refreshToken, userSecretKey) as {
        userId: string;
      };

      const newAccessToken = jwt.sign(
        { userId: verifiedUser.userId },
        userSecretKey,
        {
          expiresIn: ENV.JWT_LIFE_TIME_ACCESS as any,
        }
      );

      const newRefreshToken = jwt.sign(
        { userId: verifiedUser.userId },
        userSecretKey,
        {
          expiresIn: ENV.JWT_LIFE_TIME_REFRESH as any,
        }
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw new ErrorException(
        'INVALID_REFRESH_TOKEN|403',
        'Invalid refresh token'
      );
    }
  }

  async getMe(id: number) {
    return await this.userRepo
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }
}
