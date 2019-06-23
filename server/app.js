var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    if (!req.headers.authorization || (req.headers.authorization && req.headers.authorization != '$n1th1e@123')) {
        return res.status(403).json({error: 'No credentials sent!'})
    }
    next();
})
app.use(express.static(path.join(__dirname, 'public', 'client')));

app.use('/api/v1', indexRouter);

module.exports = app;
