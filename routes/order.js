const express = require('express');
const router = express.Router();
const Order = require('../models/order').Order;
const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function(req, res, next) {
    Order.all((orders, message) => {
        res.json({
            message: message,
            orders: orders
        });
    });
});

router.post('/add', checkLogin, function(req, res, next) {
    const goodsId = req.body.goodsId;
    const userId = req.session.user.userId;
    const date = new Date();
    if (goodsId) {
        const orderState = 1;
        Order.add(
            {
                goodsId: goodsId,
                userId: userId,
                generateTime: date.toLocaleString(),
                orderState: orderState
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

router.get('/:orderId', function(req, res, next) {
    const orderId = req.params.orderId;
    Order.getById(orderId, (order, message) => {
        res.json({
            order: order,
            message: message
        });
    });
});

router.post('/:orderId', checkLogin, function(req, res, next) {
    const orderId = req.params.orderId;
    let order = {
        orderState: req.body.orderState
    };
    const isAdmin = req.session.user.userState === 5;
    const isItself = parseInt(req.body.userId) === req.session.user.userId;
    if (!isAdmin && !isItself) {
        res.json({
            message: 'Permission denied.'
        });
    } else {
        Order.updateById(orderId, order, message => {
            res.json({
                message: message
            });
        });
    }
});

module.exports = router;
