const express = require('express');
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/order', orderRouter);

module.exports = app;
