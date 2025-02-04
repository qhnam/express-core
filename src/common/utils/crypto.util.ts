import crypto from 'crypto';
import { ENV } from '../../config/environment';

const generateUserSecretKey = (userId: string | number) => {
  const baseSecret = ENV.SECRET_KEY as string;
  return crypto
    .createHmac('sha256', baseSecret)
    .update(String(userId))
    .digest('hex');
};

export { generateUserSecretKey };
