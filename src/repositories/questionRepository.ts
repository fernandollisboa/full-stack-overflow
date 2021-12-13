import connection from '../database/connection';
import AnsweredQuestion from '../protocols/AnsweredQuestion';
import Question from '../protocols/Question';
import QuestionDTO from '../protocols/QuestionDTO';

export async function insert(question: QuestionDTO, now: Date): Promise<Question> {
  const query = await connection.query(
    `INSERT INTO questions 
            (question,student_name,class,tags,"submitAt")
            VALUES ($1,$2,$3,$4,$5)
     RETURNING *;`,
    [question.question, question.student, question.class, question.tags, now],
  );

  return query.rows[0];
}

export async function selectById(id: number): Promise<Question> {
  const query = await connection.query(
    `SELECT id,question,student_name AS student,class,tags,answered,"submitAt"
     FROM questions 
     WHERE id = $1`,
    [id],
  );

  return query.rows[0];
}

export async function selectAnswerByQuestionId(question: Question): Promise<AnsweredQuestion> {
  const query = await connection.query(
    'SELECT "answeredAt","answeredBy", answer FROM questions WHERE id = $1',
    [question.id],
  );
  return query.rows[0];
}

export async function selectAllWhereAnsweredIsFalse(): Promise<Question[]> {
  const query = await connection.query(`SELECT id,question,student_name AS student,class,"submitAt"
                            FROM questions 
                            WHERE answered IS FALSE;`);
  return query.rows;
}

export async function insertAnswer(question: AnsweredQuestion): Promise<AnsweredQuestion> {
  const query = await connection.query(
    `UPDATE questions 
     SET answered = TRUE, "answeredAt" = $1,"answeredBy"= $2, answer = $3
     WHERE id = $4 RETURNING *;`,
    [question.answeredAt, question.answeredBy, question.answer, question.id],
  );

  return query.rows[0];
}
