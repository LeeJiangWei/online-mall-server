const knex = require('knex');
const fs = require('fs');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'data.db'
    },
    useNullAsDefault: true
});

function initializeDatabase() {
    const sql = fs.readFileSync('./database.sql').toString();
    db.schema.raw(sql);
}

module.exports = {
    initializeDatabase: initializeDatabase,
    db: db
};
