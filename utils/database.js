const knex = require('knex');
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
    db.schema.raw(sql).then(
        value => {
            console.log('Database initialization completed.');
        },
        reason => {
            console.error(reason);
        }
    );
}

module.exports = {
    init: init,
    db: db
};
