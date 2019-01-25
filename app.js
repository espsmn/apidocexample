var express = require('express');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/apidoc', express.static('apidoc'));

app.listen(1337, () => console.log('Task API is listening on port 1337 awyeah'))

module.exports = app;
