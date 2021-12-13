import jwt from 'jsonwebtoken';
import UserError from '../errors/UserError';
import User from '../protocols/User';
import UserDTO from '../protocols/UserDTO';
import * as userRepository from '../repositories/userRepository';

export async function createUser(user: UserDTO): Promise<User> {
  if (await userRepository.selectByName(user.name)) {
    throw new UserError(`Username "${user.name}" already registered.`, 'CONFLICT');
  }

  const jwToken = jwt.sign({ name: user.name, class: user.class }, process.env.JWT_SECRET);
  user.token = jwToken;

  const newUser = await userRepository.insert(user);

  if (!newUser) {
    throw new UserError('User Database Error', 'INTERNAL_SERVER_ERROR');
  }
  return newUser;
}
