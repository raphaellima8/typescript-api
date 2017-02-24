import {Request, Response, RequestHandler, ErrorRequestHandler, NextFunction} from 'express';
import * as HTTPStatus from 'http-status';

export function errorHandlerApi(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('API error handler was called: ', err);
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    errorCode: 'ERR-001',
    message: 'Internal Server Error'
  });
}
