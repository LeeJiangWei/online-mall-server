const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json('');
});

router.get('/:orderId', function(req, res, next) {
    res.json('');
});

router.post('/:orderId', function(req, res, next) {
    res.json('');
});

router.post('/add', function(req, res, next) {
    res.json('');
});

module.exports = router;
