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
                if (order.length === 0) {
                    callback(undefined, 'No such order: ' + id);
                } else {
                    callback(order[0], message);
                }
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
                let message = 'success';
                if (error) {
                    message = error.message;
                }
                callback(orders, message);
            });
    }

    static search(userId, keyword, orderState, callback) {
        let orderStates = [];
        if (orderState === undefined) {
            orderStates = [0, 1, 2, 3];
        } else {
            orderStates.push(orderState);
        }
        db('orders')
            .where('userId', userId)
            .whereIn('orderState', orderStates)
            .innerJoin('goods', 'orders.goodsId', 'goods.goodsId')
            .whereRaw('LOWER(goods.name) LIKE ?', `%${keyword.toLowerCase()}%`)
            .orWhereRaw(
                'LOWER(goods.description) LIKE ?',
                `%${keyword.toLowerCase()}%`
            )
            .orWhereRaw(
                'LOWER(orders.generateTime) LIKE ?',
                `%${keyword.toLowerCase()}%`
            )
            .orWhereRaw(
                'LOWER(goods.category) LIKE ?',
                `%${keyword.toLowerCase()}%`
            )
            .asCallback((error, orders) => {
                let message = 'success';
                if (error) {
                    console.error(error);
                    message = error.message;
                }
                callback(orders, message);
            });
    }
}

module.exports.Order = Order;
