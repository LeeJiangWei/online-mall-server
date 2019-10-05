const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function(req, res, next) {
    User.all((users, message) => {
        res.json({
            message: message,
            users: users
        });
    });
});

router.get('/:userId', function(req, res, next) {
    const userId = req.params.userId;
    User.getById(userId, (user, message) => {
        res.json({
            message: message,
            user: user
        });
    });
});

router.post('/:userId', checkLogin, function(req, res, next) {
    const userId = req.params.userId;
    let user = req.params.user;
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

router.post('/register', function(req, res, next) {
    const userName = req.params.userName;
    const password = req.params.password;
    User.register({ userName: userName, password: password }, message => {
        res.json({
            message: message
        });
    });
});

router.post('/login', function(req, res, next) {
    const userName = req.params.userName;
    const password = req.params.password;
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

router.get('/:logout', function(req, res, next) {
    req.session.user = undefined;
    res.json({
        message: 'Logout successfully.'
    });
});

module.exports = router;
