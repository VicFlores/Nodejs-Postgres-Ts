import { json, NextFunction, Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class Users {
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM users');
      return res.status(200).json(response.rows);
    } catch (error) {
      throw new Error('Error');
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const response: QueryResult = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
      return res.status(200).json(response.rows);
    } catch (error) {
      throw new Error('Error');
    }
  }

  async postUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, email } = req.body;
      await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [
        name,
        email,
      ]);
      return res.status(200).json({
        message: 'User created',
        user: {
          name,
          email,
        },
      });
    } catch (error) {
      throw new Error('Error');
    }
  }

  async patchUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id,
      ]);
      return res.status(200).json(`User ${id} updated`);
    } catch (error) {
      throw new Error('Error');
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      return res.status(200).json(`User ${id} was deleted`);
    } catch (error) {
      throw new Error('Error');
    }
  }
}

export default Users;
