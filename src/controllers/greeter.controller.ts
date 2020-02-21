import * as express from 'express';
import { IBaseController } from './basecontroller';

class GreeterController implements IBaseController {
  public path = '/greeter';
  public router = express.Router();

  private _greetingMessage = 'Hello World';

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getGreetingMessage);
    this.router.post(this.path, this.updateGreetingMessage);
  }

  getGreetingMessage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('[greeter.controller.js] GET Greeting Called')
    res.status(200).send(this._greetingMessage);
    next();
  }

  updateGreetingMessage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const newGreeting = (req.body ? req.body.message : null);
    console.log('[greeter.controller.js] New Message received - ', newGreeting);
    if (newGreeting) {
      this._greetingMessage = newGreeting;
      res.status(200).send('Greeting message updated');
      return;
    } else {
      res.status(400).send('Greeting message is missing');
    }
  }

}

export default GreeterController;