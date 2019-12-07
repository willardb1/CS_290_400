var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 1000,
    acquireTimeout: 1000,
    timeout: 1000,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_LastNameFirstInitial',
    password: 'last 4 of student id',
    database: 'cs290_willardb'
});

module.exports.pool = pool;
