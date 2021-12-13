import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import statusCode from '../enum/httpStatus';
import * as userRepository from '../repositories/userRepository';
import UserError from '../errors/UserError';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  if (!token?.trim()) throw new UserError('Empty token field on header');

  try {
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
    const { name, classes } = jwt.decode(token, { json: true });

    if (jwtResponse instanceof String) {
      console.log('okddkpa');
      return res.status(statusCode.UNAUTHORIZED).send({ jwtResponse });
    }

    console.log('verificacao name ', name);
    console.log('jwtResponse ', jwtResponse);

    const user = await userRepository.selectByToken(token);

    console.log('verificacao id ', jwtResponse);

    if (user.name !== name) {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    }

    req.body.userName = user.name;
  } catch (err) {
    console.error(err.stack);
    return res.sendStatus(statusCode.UNAUTHORIZED);
  }

  next();
}
