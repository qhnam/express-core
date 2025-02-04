import jwt from 'jsonwebtoken';
import { generateUserSecretKey } from './crypto.util';

const generateToken = (userId: number) => {
  const userSecretKey = generateUserSecretKey(userId);

  const token = jwt.sign({ userId }, userSecretKey, { expiresIn: '1h' });
  return token;
};

export { generateToken };
