import QuestionDTO from './QuestionDTO';

interface Question extends QuestionDTO {
  id: number;
  submitAt: Date;
  answered: boolean;
}

export default Question;
