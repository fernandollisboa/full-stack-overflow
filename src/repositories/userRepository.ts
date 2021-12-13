import connection from '../database/connection';
import User from '../protocols/User';
import UserDTO from '../protocols/UserDTO';

export async function insert(user: UserDTO): Promise<User> {
  const query = await connection.query(
    `INSERT INTO users(name, class, token) VALUES ($1, $2, $3) RETURNING *;`,
    [user.name, user.class, user.token],
  );
  return query.rows[0];
}

export async function selectByName(name: string): Promise<User> {
  const query = await connection.query(`SELECT * FROM users WHERE name = $1;`, [name]);

  return query.rows[0];
}

export async function selectByToken(token: string): Promise<User> {
  const query = await connection.query(`SELECT * FROM users WHERE token = $1;`, [token]);

  return query.rows[0];
}
