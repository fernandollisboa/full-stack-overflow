import { Request, Response, NextFunction } from 'express';
import statusCode from '../enum/httpStatus';

export default async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  console.error('Error Middleware: ', err);
  return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
}
