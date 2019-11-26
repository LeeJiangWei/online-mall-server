const db = require('../utils/database').db;

class Goods {
    static all(callback) {
        db('goods')
            .select()
            .asCallback((error, goods) => {
                let message = 'success';
                if (error) {
                    message = error.message;
                }
                callback(goods, message);
            });
    }

    static getById(id, callback) {
        db('goods')
            .where('goodsId', id)
            .asCallback((error, goods) => {
                let message = 'success';
                if (error) {
                    message = error.message;
                }
                if (goods.length === 0) {
                    callback(undefined, 'No such goods: ' + id);
                } else {
                    callback(goods[0], message);
                }
            });
    }

    static search(keyword, goodsState, callback) {
        let goodsStates = [];
        if (
            goodsState === undefined ||
            goodsState === -1 ||
            goodsState === ''
        ) {
            goodsStates = [0, 1, 2];
        } else {
            goodsStates.push(goodsState);
        }
        db('goods')
            .whereIn('goodsState', goodsStates)
            .andWhere(builder => {
                builder
                    .whereRaw(
                        'LOWER(goodsName) LIKE ?',
                        `%${keyword.toLowerCase()}%`
                    )
                    .orWhereRaw(
                        'LOWER(description) LIKE ?',
                        `%${keyword.toLowerCase()}%`
                    )
                    .orWhereRaw(
                        'LOWER(category) LIKE ?',
                        `%${keyword.toLowerCase()}%`
                    );
            })
            .asCallback((error, goods) => {
                let message = 'success';
                if (error) {
                    console.error(error);
                    message = error.message;
                }
                callback(goods, message);
            });
    }

    static updateById(id, goods, callback) {
        db('goods')
            .where('goodsId', id)
            .update(goods)
            .asCallback(error => {
                if (error) {
                    callback(error.message);
                } else {
                    callback('success');
                }
            });
    }

    static delete(id, callback) {
        db('goods')
            .where('goodsId', id)
            .del()
            .asCallback(error => {
                if (error) {
                    callback(error.message);
                } else {
                    callback('success');
                }
            });
    }

    static add(goods, callback) {
        db('goods')
            .insert(goods)
            .asCallback(error => {
                if (error) {
                    callback(error.message);
                } else {
                    callback('success');
                }
            });
    }

    static belongToUser(userId, callback) {
        db('goods')
            .select()
            .where('userId', userId)
            .asCallback((error, goods) => {
                if (error) {
                    throw error;
                } else {
                    callback(goods);
                }
            });
    }
}

module.exports.Goods = Goods;
