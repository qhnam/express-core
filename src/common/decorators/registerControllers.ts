import { Application } from 'express';

export function registerControllers(app: Application, controllers: any[]) {
  controllers.forEach((ControllerClass) => {
    const controllerInstance = new ControllerClass();
    const { prefix, routes, router } = controllerInstance;
    if (routes && router) {
      routes.forEach((route: any) => {
        const middlewares = route.middleware ? [...route.middleware] : [];

        router[route.method](
          route.path,
          ...middlewares,
          route.handler.bind(controllerInstance)
        );
      });
      app.use(prefix, router);
    }
  });
}
