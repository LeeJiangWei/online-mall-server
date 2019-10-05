const db = require('../utils/database').db;

class Order {
    static all(callback) {
        db('orders')
            .select()
            .asCallback((error, orders) => {
                let message = 'success';
                if (error) {
                    message = error.message;
                }
                callback(orders, message);
            });
    }

    static getById(id, callback) {
        db('orders')
            .where('orderId', id)
            .asCallback((error, order) => {
                let message = 'success';
                if (error) {
                    message = error.message;
                }
                callback(order, message);
            });
    }

    static updateById(id, order, callback) {
        db('orders')
            .where('orderId', id)
            .update(order)
            .asCallback(error => {
                if (error) {
                    callback(error.message);
                } else {
                    callback('success');
                }
            });
    }

    static add(order, callback) {
        db('orders')
            .insert(order)
            .asCallback(error => {
                if (error) {
                    callback(error.message);
                } else {
                    callback('success');
                }
            });
    }

    static belongToUser(userId, callback) {
        db('orders')
            .select()
            .where('userId', userId)
            .asCallback((error, orders) => {
                if (error) {
                    throw error;
                } else {
                    callback(orders);
                }
            });
    }
}

module.exports.Order = Order;
