const express = require('express');
const router = express.Router();
const Order = require('../models/order').Order;
const User = require('../models/user').User;
const checkLogin = require('../middlewares/check').checkLogin;
const checkAdmin = require('../middlewares/check').checkAdmin;

router.get('/', checkLogin, function(req, res, next) {
    const userId = req.session.user.userId;
    Order.belongToUser(userId, (orders, message) => {
        res.json({
            message: message,
            orders: orders
        });
    });
});

router.get('/all', checkAdmin, function(req, res, next) {
    const userId = req.session.user.userId;
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

router.post('/search', checkLogin, function(req, res, next) {
    const userId = req.session.user.userId;
    const orderState = req.body.orderState;
    const keyword = req.body.keyword;
    Order.search(userId, keyword, orderState, (orders, message) => {
        res.json({
            message: message,
            orders: orders
        });
    });
});

router.get('/:orderId', checkLogin, function(req, res, next) {
    const orderId = req.params.orderId;
    const userId = req.session.user.userId;
    const isAdmin = req.session.user.userState === 5;
    User.haveOrder(userId, orderId, yes => {
        if (isAdmin || yes) {
            Order.getById(orderId, (order, message) => {
                let data = {
                    order: order,
                    message: message,
                    buyer: req.session.user
                };
                delete data.buyer.password;
                if (order === undefined) delete data[order];
                res.json(data);
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
