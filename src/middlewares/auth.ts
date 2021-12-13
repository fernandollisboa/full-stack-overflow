import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import statusCode from '../enum/httpStatus';
import * as userRepository from '../repositories/userRepository';
import UserError from '../errors/UserError';

export default async function auth(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const { authorization } = req.headers;
		const token = authorization?.split('Bearer ')[1];

		if (!token?.trim()) throw new UserError('Empty token field on headers.');

		const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
		const { name } = jwt.decode(token, { json: true });

		if (jwtResponse instanceof String) {
			console.log('okddkpa');
			return res.status(statusCode.UNAUTHORIZED).send({ jwtResponse });
		}

		const user = await userRepository.selectByToken(token);

		if (user.name !== name) {
			return res.sendStatus(statusCode.UNAUTHORIZED);
		}

		req.body.userName = user.name;
	} catch (err) {
		if (err instanceof UserError) {
			return res.status(statusCode.UNAUTHORIZED).send(err.message);
		}
		if (err instanceof JsonWebTokenError) {
			return res.status(statusCode.UNAUTHORIZED).send('Invalid Token.');
		}
		next(err);
	}

	next();
}
