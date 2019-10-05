const knex = require('knex');
const sqlite3 = require('sqlite3').verbose();
const sqlite3Db = new sqlite3.Database('data.db');
const fs = require('fs');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'data.db'
    },
    useNullAsDefault: true
});

function init() {
    const sql = fs.readFileSync('./database.sql').toString();
    sqlite3Db.exec(sql, error => {
        if (!error) {
            console.log('Database initialization succeeded.');
        } else {
            console.error(error.message);
        }
    });
}

module.exports = {
    init: init,
    db: db
};
