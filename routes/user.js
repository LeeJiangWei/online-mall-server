const express = require('express');
const router = express.Router();
const User = require('../models/user').User;

router.get('/', function(req, res, next) {
    User.all(users => {
        res.json(users);
    });
});

router.get('/:userId', function(req, res, next) {
    res.json('');
});

router.post('/:userId', function(req, res, next) {
    res.json('');
});

router.post('/register', function(req, res, next) {
    res.json('');
});

router.post('/login', function(req, res, next) {
    res.json('');
});

router.get('/:logout', function(req, res, next) {
    res.json('');
});

module.exports = router;
