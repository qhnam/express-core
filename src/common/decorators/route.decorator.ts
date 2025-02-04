import { asyncHandler } from '../../utils/asynHandller';

function Route(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  path: string,
  middlewares: any[] = []
): MethodDecorator {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    if (!target.routes) {
      target.routes = [];
    }

    target.routes.push({
      method,
      path,
      // handler: asyncHandler(descriptor.value),
      // handler: descriptor.value,
      handler: function (req: any, res: any, next: any) {
        const boundHandler = descriptor.value.bind(this);

        return asyncHandler(boundHandler)(req, res, next);
      },
      middleware: middlewares,
    });
  };
}

export const Get = (path: string, middlewares: any[] = []) =>
  Route('get', path, middlewares);
export const Post = (path: string, middlewares: any[] = []) => {
  return Route('post', path, middlewares);
};
export const Put = (path: string, middlewares: any[] = []) =>
  Route('put', path, middlewares);
export const Delete = (path: string, middlewares: any[] = []) =>
  Route('delete', path, middlewares);
