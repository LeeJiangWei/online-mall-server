const db = require('../utils/database').db;

class Order {
    static all(callback) {
        db('orders')
            .select()
            .asCallback((error, orders) => {
                if (error) {
                    throw error;
                } else {
                    callback(orders);
                }
            });
    }

    static getById(id, callback) {
        db('orders')
            .where('orderId', id)
            .asCallback((error, order) => {
                if (error) {
                    throw error;
                } else {
                    callback(order);
                }
            });
    }

    static updateById(id, order, callback) {
        db('orders')
            .where('orderId', id)
            .update(order)
            .asCallback(error => {
                if (error) {
                    throw error;
                } else {
                    callback();
                }
            });
    }

    static add(order, callback) {
        db('orders')
            .insert(order)
            .asCallback(error => {
                if (error) {
                    throw error;
                } else {
                    callback();
                }
            });
    }
}

module.exports.Order = Order;
