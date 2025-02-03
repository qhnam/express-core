export const BaseTimestampMigration = [
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'deleted_at',
    type: 'timestamp',
    isNullable: true,
  },
];
