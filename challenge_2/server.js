// Express setup
var express = require('express');
var app = express();
app.set('port', 3000);
app.use(express.static(__dirname + '/client'));
app.listen(process.env.PORT || app.get('port'));