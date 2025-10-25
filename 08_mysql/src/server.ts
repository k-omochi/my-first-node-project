import mysql, { RowDataPacket } from 'mysql2/promise';

interface TestRow extends RowDataPacket {
  id: number;
  name: string;
}

async function main(){
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('mysql connected.');

    const [rows] = await connection.query<TestRow[]>('SELECT * FROM test');
    console.log(rows);

    await connection.end();
  } catch (err) {
    console.error('connection error: ', err);
  }
}

main();