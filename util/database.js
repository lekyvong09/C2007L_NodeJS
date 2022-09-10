const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'c2007l_nodejs',
    password: 'ab123456..'
});

module.exports = pool.promise();