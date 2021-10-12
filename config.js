const { makeDb } = require('mysql-async-simple');
const mysql = require('mysql');

const conf = {
    connection: 
}
const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const db = makeDb();

export default connection, db ;