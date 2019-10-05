const db = require('../util').db;
const usersTable = db('users');

class User {
    static all(callback) {
        usersTable.select().asCallback((error, users) => {
            if (error) {
                throw error;
            } else {
                callback(users);
            }
        });
    }

    static getById(id, callback) {
        usersTable.where('userId', id).asCallback((error, user) => {
            if (error) {
                throw error;
            } else {
                callback(user);
            }
        });
    }

    static updateById(id, user, callback) {
        usersTable
            .where('userId', id)
            .update(user)
            .asCallback(error => {
                if (error) {
                    throw error;
                } else {
                    callback();
                }
            });
    }

    static register(user, callback) {
        usersTable.insert(user).asCallback(error => {
            if (error) {
                throw error;
            } else {
                callback();
            }
        });
    }

    static check(userName, password, callback) {
        usersTable
            .select('userId')
            .where({
                userName: userName,
                password: password
            })
            .asCallback((error, userId) => {
                if (error) {
                    throw error;
                } else {
                    if (userId) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            });
    }
}

module.exports.User = User;
