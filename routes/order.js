const express = require('express');
const router = express.Router();
const Order = require('../models/order').Order;
const User = require('../models/user').User;
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

router.get('/:orderId', checkLogin, function(req, res, next) {
    const orderId = req.params.orderId;
    const userId = req.session.user.userId;
    const isAdmin = req.session.user.userState === 5;
    User.haveOrder(userId, orderId, yes => {
        if (isAdmin || yes) {
            Order.getById(orderId, (order, message) => {
                res.json({
                    order: order,
                    message: message
                });
            });
        } else {
            res.json({
                message: 'Permission denied.'
            });
        }
    });
});

router.post('/:orderId', checkLogin, function(req, res, next) {
    const orderId = req.params.orderId;
    const userId = req.session.user.userId;
    let order = {
        orderState: req.body.orderState
    };
    if (order.orderState) {
        const isAdmin = req.session.user.userState === 5;
        User.haveOrder(userId, orderId, yes => {
            if (isAdmin || yes) {
                Order.updateById(orderId, order, message => {
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
