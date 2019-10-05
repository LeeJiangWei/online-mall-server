const db = require('../utils/database').db;

class Goods {
    static all(callback) {
        db('goods')
            .select()
            .asCallback((error, goods) => {
                if (error) {
                    throw error;
                } else {
                    callback(goods);
                }
            });
    }

    static getById(id, callback) {
        db('goods')
            .where('goodsId', id)
            .asCallback((error, goods) => {
                if (error) {
                    throw error;
                } else {
                    callback(goods);
                }
            });
    }

    static updateById(id, goods, callback) {
        db('goods')
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
        db('goods')
            .insert(goods)
            .asCallback(error => {
                if (error) {
                    throw error;
                } else {
                    callback();
                }
            });
    }
}

module.exports.Goods = Goods;
