const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Order = require('../models/order').Order;
const Goods = require('../models/goods').Goods;
const checkLogin = require('../middlewares/check').checkLogin;
const checkAdmin = require('../middlewares/check').checkAdmin;

router.get('/', checkAdmin, function(req, res, next) {
    User.all((users, message) => {
        res.json({
            message: message,
            users: users
        });
    });
});

router.post('/register', function(req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    if (userName && password) {
        const userState = 1;
        User.register(
            {
                userName: userName,
                password: password,
                address: address,
                phoneNumber: phoneNumber,
                userState: userState
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

router.post('/login', function(req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;
    User.check(userName, password, (valid, message, user) => {
        if (valid) {
            req.session.user = user;
            res.json({
                userState: user.userState,
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

router.get('/status', function(req, res, next) {
    res.json({
        user: req.session.user
    });
});

router.get('/:userId', checkLogin, function(req, res, next) {
    const userId = req.params.userId;
    const isAdmin = req.session.user.userState === 5;
    const isItself = parseInt(userId) === req.session.user.userId;

    if (isItself || isAdmin) {
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
    } else {
        res.json({
            message: 'Permission denied.'
        });
    }
});

router.post('/:userId', checkLogin, function(req, res, next) {
    const userId = req.params.userId;
    let user = {
        userName: req.body.userName,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        userState: req.body.userState
    };
    if (user.userName && user.password) {
        const isAdmin = req.session.user.userState === 5;
        const isItself = parseInt(userId) === req.session.user.userId;
        if (!isAdmin && !isItself) {
            res.json({
                message: 'Permission denied.'
            });
        } else {
            delete user.userId;
            if (!isAdmin) {
                delete user.userState;
            }
            User.updateById(userId, user, message => {
                res.json({
                    message: message
                });
            });
        }
    } else {
        res.json({
            message: 'Invalid parameters.'
        });
    }
});

module.exports = router;
