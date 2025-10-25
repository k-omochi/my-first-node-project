"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pool = promise_1.default.createPool({
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
app.get('/api/journals', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM journal');
        console.log(rows);
        res.json(rows);
    }
    catch (err) {
        console.error('connection error: ', err);
    }
});
app.post('/api/journals', async (req, res) => {
    try {
        await pool.query('INSERT INTO journal (content) VALUES (?)', [req.body.content]);
    }
    catch (err) {
        console.error('connection error: ', err);
    }
    res.status(201).json();
});
// -------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log('server started.');
});
console.log('server started.');
//# sourceMappingURL=server.js.map