import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DATABASE_NAME } from '../common/entities/database-name';
import { BaseTimestampMigration } from '../common/migrations/base-timestamp.migration';

export class CreateUserTable1738563856019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DATABASE_NAME.USERS,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'fullname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'tinyint',
            default: 1,
            comment: '1 = INACTIVE, 2 = ACTIVE, 3 = BLOCK, 4 = DELETED',
          },
          {
            name: 'verify_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
          ...BaseTimestampMigration,
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DATABASE_NAME.USERS);
  }
}
