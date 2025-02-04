import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { USER_STATUS } from '../user.constant';
import { DATABASE_NAME } from '../../../common/entities/database-name';

@Entity(DATABASE_NAME.USERS)
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'status', type: 'enum', enum: USER_STATUS })
  status: USER_STATUS;
}
