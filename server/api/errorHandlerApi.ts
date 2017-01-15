import {Request, Response, RequestHandler, ErrorRequestHandler, NextFunction} from 'express';

export function errorHandlerApi(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('API error handler was called: ', err);
  res.status(500).json({
    errorCode: 'ERR-001',
    message: 'Internal Server Error'
  });  
}
