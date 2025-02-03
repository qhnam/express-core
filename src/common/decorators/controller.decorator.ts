import express from 'express';

const Router = express.Router();

/**
 * @Controller(prefix)
 * Assign prefix to all routes in Controller class
 */
export function Controller(prefix: string): ClassDecorator {
  return function (target: any) {
    target.prototype.prefix = prefix;
    target.prototype.router = Router;
  };
}
