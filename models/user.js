const db = require('../utils/database').db;

class User {
    static all(callback) {
        db('users')
            .select()
            .asCallback((error, users) => {
                let message = 'success';
                if (error) {
                    message = error.message;
                }
                callback(users, message);
            });
    }

    static getById(id, callback) {
        db('users')
            .where('userId', id)
            .asCallback((error, user) => {
                let message = 'success';
                if (error) {
                    message = error.message;
                }
                callback(user, message);
            });
    }

    static updateById(id, user, callback) {
        db('users')
            .where('userId', id)
            .update(user)
            .asCallback(error => {
                if (error) {
                    callback(error.message);
                } else {
                    callback('success');
                }
            });
    }

    static register(user, callback) {
        db('users')
            .insert(user)
            .asCallback(error => {
                if (error) {
                    callback(error.message);
                } else {
                    callback('success');
                }
            });
    }

    static check(userName, password, callback) {
        db('users')
            .select()
            .where({
                userName: userName,
                password: password
            })
            .asCallback((error, data) => {
                if (error) {
                    callback(false, error.message, undefined);
                } else {
                    let message = 'success';
                    if (data[0]) {
                        callback(true, message, data[0]);
                    } else {
                        message = 'Invalid credentials.';
                        callback(false, message, undefined);
                    }
                }
            });
    }

    static haveGoods(userId, goodsId, callback) {
        db('goods')
            .select(userId)
            .where('userId', userId)
            .andWhere('goodsId', goodsId)
            .asCallback((error, data) => {
                if (data[0]) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
    }

    static haveOrder(userId, orderId, callback) {
        db('orders')
            .select(userId)
            .where('userId', userId)
            .andWhere('orderId', orderId)
            .asCallback((error, data) => {
                if (data[0]) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
    }
}

module.exports.User = User;
