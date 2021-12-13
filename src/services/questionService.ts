import { format } from 'date-fns';
import QuestionError from '../errors/QuestionError';
import Question from '../protocols/Question';
import QuestionDTO from '../protocols/QuestionDTO';
import * as questionRepository from '../repositories/questionRepository';
import * as userRepository from '../repositories/userRepository';

export async function createQuestion(question: QuestionDTO): Promise<Question> {
  if (!(await userRepository.selectByName(question.student))) {
    throw new QuestionError(`User "${question.student}" not found`, 'NOT_FOUND');
  }
  const now = new Date();
  const insertedQuestion: Question = await questionRepository.insert(question, now);

  if (!insertedQuestion) {
    throw new QuestionError('Question Database Error', 'INTERNAL_SERVER_ERROR');
  }
  return insertedQuestion;
}
