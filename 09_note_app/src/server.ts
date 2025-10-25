import mysql, { RowDataPacket } from 'mysql2/promise';
import express, { Request, Response } from 'express';

interface JournalRow extends RowDataPacket {
  id: number;
  content: string;
}

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
console.log('pool created.');

// api
app.get('/api/journals', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<JournalRow[]>('SELECT * FROM journal');
    console.log(rows);
    
    res.json(rows);
  } catch (err) {
    console.error('connection error: ', err);
  }
});

app.post('/api/journals',async (req: Request, res: Response) => {
  try {
    await pool.query('INSERT INTO journal (content) VALUES (?)', [req.body.content]);
  } catch (err) {
    console.error('connection error: ', err);
  }
  res.status(201).json();
})

// -------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log('server started.');
});
console.log('server started.');