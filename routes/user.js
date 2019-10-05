const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Order = require('../models/order').Order;
const Goods = require('../models/goods').Goods;
const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function(req, res, next) {
    User.all((users, message) => {
        res.json({
            message: message,
            users: users
        });
    });
});

router.post('/register', function(req, res, next) {
    let user = req.body.user;
    if (user && user.userName && user.password) {
        user.userState = 1;
        User.register(user, message => {
            res.json({
                message: message
            });
        });
    } else {
        res.json({
            message: 'Invalid parameters.'
        });
    }
});

router.post('/login', function(req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;
    User.check(userName, password, (valid, message, userState) => {
        if (valid) {
            req.session.user = {
                userName: userName,
                userState: userState
            };
            res.json({
                userState: userState,
                message: message
            });
        } else {
            res.json({
                userState: undefined,
                message: message
            });
        }
    });
});

router.get('/logout', function(req, res, next) {
    req.session.user = undefined;
    res.json({
        message: 'Logout successfully.'
    });
});

router.get('/:userId', function(req, res, next) {
    const userId = req.params.userId;
    User.getById(userId, (user, message) => {
        Goods.belongToUser(userId, goods => {
            Order.belongToUser(userId, orders => {
                res.json({
                    message: message,
                    user: user,
                    goods: goods,
                    orders: orders
                });
            });
        });
    });
});

router.post('/:userId', checkLogin, function(req, res, next) {
    const userId = req.params.userId;
    let user = req.body.user;
    if (
        req.session.user.userState !== 5 &&
        user.userName !== req.session.user.userName
    ) {
        res.json({
            message: 'Permission denied.'
        });
    } else {
        if (req.session.user.userState !== 5) {
            delete user.id;
            delete user.userState;
        }
        User.updateById(userId, user, message => {
            res.json({
                message: message
            });
        });
    }
});

module.exports = router;
