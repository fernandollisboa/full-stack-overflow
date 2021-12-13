import statusCode from '../enum/httpStatus';

class QuestionError extends Error {
  statusCode: any;

  constructor(message: string, httpStatus?: string) {
    super(message);
    this.message = message;
    this.name = 'QuestionError';
    Object.setPrototypeOf(this, QuestionError.prototype);
    this.statusCode = statusCode[httpStatus as keyof typeof statusCode] || 400;
  }
}

export default QuestionError;
