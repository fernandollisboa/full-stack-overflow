import Question from './Question';

interface AnsweredQuestion extends Question {
  answeredAt: Date;
  answeredBy: string;
  answer: string;
}

export default AnsweredQuestion;
