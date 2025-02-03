import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

/**
 * Middleware
 * @param DtoClass - Class rule validation
 * @param source - body, query, params (default: 'body')
 */
export function validationMiddleware(
  DtoClass: any,
  source: 'body' | 'query' | 'params' = 'body'
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const dtoInstance = plainToInstance(DtoClass, data);

    validate(dtoInstance).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: errors.map((err) => ({
            field: err.property,
            constraints: err.constraints,
          })),
        });
      }

      req[source] = dtoInstance;
      next();
    });
  };
}
