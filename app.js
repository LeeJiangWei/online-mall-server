const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require('./utils/database');
const userRouter = require('./routes/user');
const goodsRouter = require('./routes/goods');
const orderRouter = require('./routes/order');
const app = express();

database.init();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('better'));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: 'better'
    })
);
app.use(flash());
app.use('/api/user', userRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/order', orderRouter);

app.use(function(req, res, next) {
    if (!res.headersSent) {
        res.json({
            message: '404 not found.'
        });
    }
    next();
});

app.use(function(err, req, res, next) {
    res.json(err);
    next();
});

module.exports = app;
