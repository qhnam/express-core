import crypto from 'crypto';

const generateUserSecretKey = (userId: number) => {
  const baseSecret = process.env.GLOBAL_SECRET_KEY as string;
  return crypto
    .createHmac('sha256', baseSecret)
    .update(String(userId))
    .digest('hex');
};

export { generateUserSecretKey };
