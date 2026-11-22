const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,    // las fechas salen como 'AAAA-MM-DD' (string), no como objetos Date
  decimalNumbers: true, // los DECIMAL salen como números, no como strings
});

module.exports = pool;
