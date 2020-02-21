import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as compression from 'compression';
import GreeterController from './controllers/greeter.controller';
import loggerMiddleware from './middlewares/loggerMiddleware';
import { IBaseController } from './controllers/basecontroller';

export default class Server {
  app: express.Application = express();

  constructor(private port: number, private basePath = '/api/v1') {
    this._setupMiddlewares();
    this._mountRoutes();
  }

  private _setupMiddlewares() {
    this.app
      .use(bodyParser.json())
      .use(cookieParser())
      .use(methodOverride())
      .use(compression())
      .use(loggerMiddleware);
  }

  private _mountRoutes() {
    const controllers: IBaseController[] = [
      new GreeterController()
    ];

    controllers.forEach(controller => {
      const routePath = (`${this.basePath}${controller.path}`);
      this.app.use(this.basePath, controller.router);
      console.debug(`Registering ${routePath}`);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.debug(`[server.js] Server running at port ${this.port}.`);
    });
  }
}