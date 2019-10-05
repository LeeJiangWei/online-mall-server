const express = require('express');
const router = express.Router();
const Goods = require('../models/goods').Goods;
const checkLogin = require('../middlewares/check').checkLogin;
const checkAdmin = require('../middlewares/check').checkAdmin;

router.get('/', function(req, res, next) {
    Goods.all((goods, message) => {
        res.json({
            message: message,
            goods: goods
        });
    });
});

router.post('/add', function(req, res, next) {
    const goodsName = req.body.goodsName;
    const price = req.body.price;
    const picture = req.body.picture;
    const category = req.body.category;
    const description = req.body.description;
    if (goodsName && price) {
        const goodsState = 1;
        Goods.add(
            {
                goodsName: goodsName,
                price: price,
                picture: picture,
                category: category,
                description: description,
                goodsState: goodsState
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
    Goods.getById(goodsId, (goods, message) => {
        res.json({
            goods: goods,
            message: message
        });
    });
});

router.post('/:goodsId', function(req, res, next) {
    const goodsId = req.params.goodsId;
    let goods = {
        goodsName: req.body.goodsName,
        price: req.body.price,
        picture: req.body.picture,
        category: req.body.category,
        description: req.body.description,
        goodsState: req.body.goodsState
    };
    const isAdmin = req.session.user.userState === 5;
    const isItself = parseInt(req.body.userId) === req.session.user.userId;
    if (!isAdmin && !isItself) {
        res.json({
            message: 'Permission denied.'
        });
    } else {
        if (!isAdmin) {
            delete goods.goodsState;
        }
        Goods.updateById(goodsId, goods, message => {
            res.json({
                message: message
            });
        });
    }
});

module.exports = router;
