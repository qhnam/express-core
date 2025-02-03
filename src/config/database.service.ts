import { AppDataSource } from './ormconfig';

export class DatabaseService {
  static async initialize() {
    try {
      await AppDataSource.initialize();
      console.log('Database connection established');
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  }
}
