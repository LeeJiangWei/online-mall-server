const db = require('../util').db;
const ordersTable = db('orders');

class Order {
    static all(callback) {
        ordersTable.select().asCallback((error, orders) => {
            if (error) {
                throw error;
            } else {
                callback(orders);
            }
        });
    }

    static getById(id, callback) {
        ordersTable.where('orderId', id).asCallback((error, order) => {
            if (error) {
                throw error;
            } else {
                callback(order);
            }
        });
    }

    static updateById(id, order, callback) {
        ordersTable
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
        ordersTable.insert(order).asCallback(error => {
            if (error) {
                throw error;
            } else {
                callback();
            }
        });
    }
}

module.exports.Order = Order;
