const PORT = 3000;

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello Express!</h1><p>rootです</p>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About</h1><p>aboutです</p>');
});

app.listen(PORT, () => {
    console.log('server started.');
});