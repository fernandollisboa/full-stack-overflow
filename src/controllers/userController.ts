import { Request, Response, NextFunction } from 'express';
import statusCode from '../enum/httpStatus';
import * as userService from '../services/userService';
import userSchema from '../validations/userSchema';
import UserDTO from '../protocols/UserDTO';
import UserError from '../errors/UserError';

export async function postUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
	try {
		const joiValidation = userSchema.validate(req.body);

		if (joiValidation.error) {
			throw new UserError(joiValidation.error.message);
		}

		const newUser: UserDTO = req.body;

		if (!newUser.name.trim() || !newUser.class.trim()) {
			throw new UserError('Name and/or class can not only contain blank spaces');
		}

		const createdUser = await userService.createUser(newUser);

		return res.send({ token: createdUser.token }).status(statusCode.CREATED);
	} catch (err) {
		if (err instanceof UserError) {
			return res.status(err.statusCode).send(err.message);
		}

		next(err);
	}
}
