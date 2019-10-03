const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const util = require('./util');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

util.initializeDatabase();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
