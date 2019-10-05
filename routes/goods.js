const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json('');
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
