const PORT = 3000;

const express = require('express');
const app = express();

let users = [
    {id: 1, name: 'Alice' },
    {id: 2, name: 'Bob' },
]

// use json
app.use(express.json());

// api
app.get('/api/users', (req, res) => {
    res.json(users);
});
app.get('/api/users/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    const user = users.find(u => u.id === requestId);
    if (!user) {
        return res.status(404).json({error: 'user not found.'});
    }
    res.json(user);
});

app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// -------------------

app.listen(PORT, () => {
    console.log('server started.');
});