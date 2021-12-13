import QuestionError from '../errors/QuestionError';
import AnsweredQuestion from '../protocols/AnsweredQuestion';
import Question from '../protocols/Question';
import QuestionDTO from '../protocols/QuestionDTO';
import * as questionRepository from '../repositories/questionRepository';
import * as userRepository from '../repositories/userRepository';
import AnswerDTO from '../protocols/AnswerDTO';

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

export async function createAnswer(answer: AnswerDTO): Promise<AnsweredQuestion> {
  const question = await questionRepository.selectById(answer.questionId);
  if (!question) {
    throw new QuestionError(`Question with id = ${answer.questionId} does not exists`);
  }

  const now = new Date();

  const updatedQuestion: AnsweredQuestion = {
    ...question,
    answeredBy: answer.answeredBy,
    answer: answer.answer,
    answeredAt: now,
  };

  const answeredQuestion = await questionRepository.insertAnswer(updatedQuestion);

  if (!answeredQuestion) {
    throw new QuestionError('Question Database Error', 'INTERNAL_SERVER_ERROR');
  }
  return answeredQuestion;
}
