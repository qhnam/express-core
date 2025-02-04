import express from 'express';
import { ENV } from '../../config/environment';

/**
 * @Controller(prefix)
 * Assign prefix to all routes in Controller class
 */
export function Controller(prefix: string): ClassDecorator {
  return function (target: any) {
    target.prototype.prefix = `${ENV.API_PREFIX}/${prefix.replace(/^\/+/, '')}`;
    target.prototype.router = express.Router();
  };
}
