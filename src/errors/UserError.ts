import statusCode from '../enum/httpStatus';

class UserError extends Error {
  statusCode: number;

  constructor(message: string, httpStatus?: string) {
    super(message);
    this.message = message;
    this.name = 'UserError';
    Object.setPrototypeOf(this, UserError.prototype);
    this.statusCode = statusCode[httpStatus as keyof typeof statusCode] || 400;
  }
}

export default UserError;
