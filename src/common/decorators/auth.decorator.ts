import { NextFunction, Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { verifyAuth } from '../utils/jwt.util';

/**
 *  Auth(requiredRole?: string)
 * - If applied on **Class (Controller)** → Authenticate for all APIs in Controller.
 * - If applied on **Method (specific API)** → Only that API needs authentication.
 */
export function Auth(
  requiredRole?: string
): ClassDecorator | MethodDecorator | any {
  return function (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ) {
    if (typeof propertyKey === 'undefined') {
      // If @Auth is applied on class (Controller)
      AuthForController(requiredRole)(target);
    } else {
      // If @Auth is applied on method (API)
      return AuthForMethod(requiredRole)(target, propertyKey!, descriptor!);
    }
  };
}

export function AuthForController(requiredRole?: string): ClassDecorator | any {
  return function (target: any) {
    Reflect.defineMetadata('auth_guard', requiredRole || true, target);

    const originalConstructor = target;

    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(...args);

        // middleware check auth
        this.router.use(
          async (req: CustomRequest, res: Response, next: NextFunction) => {
            await verifyAuth(req, res, next, requiredRole);
          }
        );
      }
    };
  };
}

function AuthForMethod(requiredRole?: string): MethodDecorator {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: CustomRequest,
      res: Response,
      next: NextFunction
    ) {
      await verifyAuth(req, res, next, requiredRole);
      return originalMethod.apply(this, [req, res, next]);
      // try {

      // } catch (error) {
      //   return res.status(500).json({ message: 'Internal server error' });
      // }
    };

    return descriptor;
  };
}
