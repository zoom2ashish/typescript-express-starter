import { Express, Request, Response, NextFunction  } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.debug(`${req.method} - ${req.path}`);
  next();
};

export default loggerMiddleware;