import bcrypt from 'bcrypt';

const saltRounds = 10;

export class HashUtil {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
