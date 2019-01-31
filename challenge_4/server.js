var express = require('express');
var morgan = require('morgan');

var app = express();
app.set('port', 3000);
app.use(express.static(__dirname + '/client/dist/'));
app.use(morgan('default'));
app.listen(app.get('port'));
