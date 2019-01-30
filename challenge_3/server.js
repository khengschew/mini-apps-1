var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('default'));
app.use(express.static(__dirname + '/public'));

app.set('port', 3000);
app.listen(app.get('port'));