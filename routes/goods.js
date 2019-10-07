const express = require('express');
const router = express.Router();
const Goods = require('../models/goods').Goods;
const User = require('../models/user').User;
const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function(req, res, next) {
    Goods.all((goods, message) => {
        res.json({
            message: message,
            goods: goods
        });
    });
});

router.post('/add', checkLogin, function(req, res, next) {
    const goodsName = req.body.goodsName;
    const price = req.body.price;
    const picture = req.body.picture;
    const category = req.body.category;
    const description = req.body.description;
    const userId = req.session.user.userId;
    const date = new Date();
    if (goodsName && price) {
        const goodsState = 1;
        Goods.add(
            {
                goodsName: goodsName,
                price: price,
                picture: picture,
                category: category,
                description: description,
                goodsState: goodsState,
                userId: userId,
                postTime: date.toLocaleString()
            },
            message => {
                res.json({
                    message: message
                });
            }
        );
    } else {
        res.json({
            message: 'Invalid parameters.'
        });
    }
});

router.get('/:goodsId', function(req, res, next) {
    const goodsId = req.params.goodsId;
    Goods.getById(goodsId, (goods, message1) => {
        User.getById(goods.userId, (seller, message2) => {
            let data = {
                goods: goods,
                message: message1 + '\n' + message2,
                seller: seller
            };
            delete data.seller.password;
            if (goods === undefined) {
                delete data.goods;
                delete data.seller;
            }
            res.json(data);
        });
    });
});

router.post('/:goodsId', checkLogin, function(req, res, next) {
    const goodsId = req.params.goodsId;
    const userId = req.session.user.userId;
    let goods = {
        goodsName: req.body.goodsName,
        price: req.body.price,
        picture: req.body.picture,
        category: req.body.category,
        description: req.body.description,
        goodsState: req.body.goodsState
    };
    if (goods.goodsName && goods.price) {
        const isAdmin = req.session.user.userState === 5;
        User.haveGoods(userId, goodsId, yes => {
            if (isAdmin || yes) {
                if (!isAdmin) {
                    delete goods.goodsState;
                }
                Goods.updateById(goodsId, goods, message => {
                    res.json({
                        message: message
                    });
                });
            } else {
                res.json({
                    message: 'Permission denied.'
                });
            }
        });
    } else {
        res.json({
            message: 'Invalid parameters.'
        });
    }
});

module.exports = router;
