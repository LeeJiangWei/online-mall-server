const db = require('../util').db;
const goodsTable = db('goods');

class Goods {
    static all(callback) {
        goodsTable.select().asCallback((error, goods) => {
            if (error) {
                throw error;
            } else {
                callback(goods);
            }
        });
    }

    static getById(id, callback) {
        goodsTable.where('goodsId', id).asCallback((error, goods) => {
            if (error) {
                throw error;
            } else {
                callback(goods);
            }
        });
    }

    static updateById(id, goods, callback) {
        goodsTable
            .where('goodsId', id)
            .update(goods)
            .asCallback(error => {
                if (error) {
                    throw error;
                } else {
                    callback();
                }
            });
    }

    static add(goods, callback) {
        goodsTable.insert(goods).asCallback(error => {
            if (error) {
                throw error;
            } else {
                callback();
            }
        });
    }
}

module.exports.Goods = Goods;
