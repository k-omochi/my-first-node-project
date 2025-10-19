import express, { Request, Response } from 'express';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: 'TypeScript + Express'
  });
});

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const users: User[] = [
  {id: 1, name: 'Alice' ,email: "alice@hoge.com", age: 23},
  {id: 2, name: 'Bob', email: "bob@fuga.com", age: 35 },
];

app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});