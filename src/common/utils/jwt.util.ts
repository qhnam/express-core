import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../../config/environment';
import { ErrorException } from '../../config/error-exception';
import { CustomRequest } from '../interfaces/request.interface';
import { generateUserSecretKey } from './crypto.util';

const generateToken = (userId: number) => {
  const userSecretKey = generateUserSecretKey(userId);
  const accessToken = jwt.sign({ userId }, userSecretKey, {
    expiresIn: ENV.JWT_LIFE_TIME_ACCESS as any,
  });

  const refreshToken = jwt.sign({ userId }, userSecretKey, {
    expiresIn: ENV.JWT_LIFE_TIME_REFRESH as any,
  });
  return { accessToken, refreshToken };
};

async function verifyAuth(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
  requiredRole?: string
) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    throw new ErrorException('FORBIDDEN|403', 'Forbidden');
  }

  const decoded = jwt.decode(token) as {
    userId: string;
    role?: string;
    exp: number;
  };

  if (!decoded || !decoded.userId) {
    throw new ErrorException('FORBIDDEN|403', 'Forbidden');
  }

  const userSecretKey = generateUserSecretKey(decoded.userId);

  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    return res.status(401).json({ message: 'Token expired' });
  }

  try {
    const verifyUser = jwt.verify(token, userSecretKey) as {
      userId: string;
      role?: string;
    };
    req.userId = Number(verifyUser.userId);
    // return next();
  } catch (err) {
    throw new ErrorException('FORBIDDEN|403', 'Forbidden');
  }
}

export { generateToken, verifyAuth };
