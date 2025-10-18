const PORT = 3000;

const express = require('express');
const app = express();

// use static files
app.use(express.static('public', {
    maxAge: 0 // キャッシュ期間。開発中なので0
}));

// api
app.get('/api/hello', (req, res) => {
    res.json({ message: 'hello API!'});
});

app.listen(PORT, () => {
    console.log('server started.');
});