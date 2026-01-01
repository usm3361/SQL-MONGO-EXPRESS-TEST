import mysql from "mysql2/promise";

export async function initMySqlDb() {
  const initConnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
  });

  const CREATE_DB_QUERY = `CREATE DATABASE IF NOT EXISTS Cipher;`;

  const USE_DB_QUERY = "USE Cipher;";

  const CREATE_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(24) NOT NULL,
  cipher_type VARCHAR(30) NOT NULL,
  encrypted_text VARCHAR(255) NOT NULL,
  inserted_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

  await initConnection.query(CREATE_DB_QUERY);
  await initConnection.query(USE_DB_QUERY);
  await initConnection.query(CREATE_TABLE_QUERY);

  await initConnection.end();
}

let conn = null;

export async function getMySqlConn() {
  if (conn) return conn;
  else {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port: 3306,
      database: "Cipher",
    });
    return conn;
  }
}
