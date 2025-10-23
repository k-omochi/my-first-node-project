
const mysql = require('mysql2');

async function main(){
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('mysql connected.');
    await connection.end();
  } catch (err) {
    console.error('connection error: ', err);
  }
}

main();