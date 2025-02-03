import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { USER_STATUS } from '../user.constant';

export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'status', type: 'enum' })
  status: USER_STATUS;
}
