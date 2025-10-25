import mysql, { RowDataPacket } from 'mysql2/promise';
import express, { Request, Response } from 'express';

interface JournalRow extends RowDataPacket {
  id: number;
  content: string;
}

const app = express();
app.use(express.json());

// api
app.get('/api/journals', async (req: Request, res: Response) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('mysql connected.');

    const [rows] = await connection.query<JournalRow[]>('SELECT * FROM journal');
    console.log(rows);
    
    res.json(rows);

    await connection.end();
  } catch (err) {
    console.error('connection error: ', err);
  }
});

// -------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log('server started.');
});
console.log('server started.');