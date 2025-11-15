import mysql, { RowDataPacket } from 'mysql2/promise';
import express, { Request, Response } from 'express';

interface JournalRow extends RowDataPacket {
  id: number;
  content: string;
  journal_date: string;
  created_at: Date;
  updated_at: Date;
}

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: '+09:00', // JST
  dateStrings: true,
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

app.post('/api/journals', async (req: Request, res: Response) => {
    try {
      const { content, journalDate } = req.body as {
        content: string;
        journalDate: string;
      };
      console.log(`content: ${content}, journalDate: ${journalDate}`);

      await pool.query('INSERT INTO journal (content, user_id, journal_date) VALUES (?, ?, ?)',
      [content, 1, journalDate]);
    } catch (err) {
      console.error('connection error: ', err);
    }
    res.status(201).json();
});

// WIP
// app.put('api/journals/:id', (req: Request, res: Response) => {
//   ( async () => {
//     try {
//       console.log("update journal");
//     } catch (err) {
//       console.error('connection error: ', err);
//     }
//   });
//   res.status(201).json();
// });

// app.delete('api/journals/:id', (req: Request, res: Response) => {
//   ( async () => {
//     try {
//       console.log("delete journal");
//     } catch (err) {
//       console.error('connection error: ', err);
//     }
//   });
// });

// -------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log('server started.');
});
console.log('server started.');