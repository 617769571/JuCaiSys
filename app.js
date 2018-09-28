var express = require('express');
var compression = require('compression');

var app = express();
app.use(compression());

app.use(express.static('www/dist/src'));

var server = app.listen(3000, function (req, res) {
    console.log('start service');
});