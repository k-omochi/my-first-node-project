const PORT = 3000;

const express = require('express');
const app = express();

let users = [
    {id: 1, name: 'Alice' ,email: "alice@hoge.com", age: 23},
    {id: 2, name: 'Bob', email: "bob@fuga.com", age: 35 },
]

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

// root
app.get('/', (_req, res) => {
    res.render('index', {
      title: 'Home',
      message: 'Express + EJS のデモです'
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
  
// ユーザー詳細
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).render('404', { title: '404 Not Found' });
    }

    res.render('user-detail', {
        title: user.name,
        user: user
    });
});

// -------------------

app.listen(PORT, () => {
    console.log('server started.');
});