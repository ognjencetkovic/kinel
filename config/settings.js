var path = require('path');

var settings = {
    path: path.normalize(path.join(__dirname, '..')),
    port: process.env.NODE_PORT || 3000,
    saltLength: 16,
    database: {
        protocol: "mysql",
        query: { pool: true },
        host: "localhost",
        database: "kinel",
        user: "root",
        password: ""
    }
};

module.exports = settings;