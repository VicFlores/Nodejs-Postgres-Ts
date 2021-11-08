import { Pool } from 'pg';

export const pool = new Pool({
  user: 'vicflores11',
  host: 'localhost',
  password: 'root',
  database: 'my_store',
  port: 5432,
});
