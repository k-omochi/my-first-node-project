const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.end('<h1>Hello, Web App!</h1><p>初めてのNode.js Webアプリです</p>');
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log('server started: http://localhost:${PORT}');
});