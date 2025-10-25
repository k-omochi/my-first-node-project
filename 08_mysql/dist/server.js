"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
async function main() {
    try {
        const connection = await promise_1.default.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('mysql connected.');
        const [rows] = await connection.query('SELECT * FROM test');
        console.log(rows);
        await connection.end();
    }
    catch (err) {
        console.error('connection error: ', err);
    }
}
main();
//# sourceMappingURL=server.js.map