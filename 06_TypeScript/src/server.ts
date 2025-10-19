import express, { Request, Response } from 'express';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());


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

// root
app.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: 'TypeScript + Express'
  });
});

// about
app.get('/about', (_req, res) => {
    res.render('index', {
      title: 'About',
      message: 'このサイトについて'
    });
});

// ユーザー一覧
app.get('/users', (_req, res) => {
    res.render('users', {
      title: 'ユーザー一覧',
      users: users
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});