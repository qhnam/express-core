import { Request, Response, NextFunction } from 'express';
import { ErrorException } from '../../config/error-exception';

export const errorHandlerMiddleware = (
  exception: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorException: ErrorException;

  if (exception instanceof ErrorException) {
    errorException = exception;
  } else {
    errorException = new ErrorException(
      'AN_UNKNOWN_ERROR|500',
      'An unknown error'
    );
  }

  res.status(errorException.httpStatusCode).json(errorException.returnError());
};
