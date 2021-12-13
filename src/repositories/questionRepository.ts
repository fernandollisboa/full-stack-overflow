import connection from '../database/connection';
import Question from '../protocols/Question';
import QuestionDTO from '../protocols/QuestionDTO';

export async function insert(question: QuestionDTO, now: Date): Promise<Question> {
  const result = await connection.query(
    `INSERT INTO questions 
                (question,student_name,class,tags,"submitAt")
            VALUES ($1,$2,$3,$4,$5)
     RETURNING *;`,
    [question.question, question.student, question.class, question.tags, now],
  );

  return result.rows[0];
}
