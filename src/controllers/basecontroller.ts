import * as express from 'express';

export interface IBaseController {
  path: string;
  router: express.Router;
}
