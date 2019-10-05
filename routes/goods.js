const express = require('express');
const router = express.Router();
const Goods = require('../models/goods').Goods;

router.get('/', function(req, res, next) {
    Goods.all(goods => {
        res.json(goods);
    });
});

router.get('/:goodsId', function(req, res, next) {
    res.json('');
});

router.post('/:goodsId', function(req, res, next) {
    res.json('');
});

router.post('/add', function(req, res, next) {
    res.json('');
});

module.exports = router;
