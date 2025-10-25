"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// api
app.get('/api/journals', async (req, res) => {
    try {
        const connection = await promise_1.default.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('mysql connected.');
        const [rows] = await connection.query('SELECT * FROM journal');
        console.log(rows);
        res.json(rows);
        await connection.end();
    }
    catch (err) {
        console.error('connection error: ', err);
    }
});
// -------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log('server started.');
});
console.log('server started.');
//# sourceMappingURL=server.js.map