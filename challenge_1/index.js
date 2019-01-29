// Do npm install express --save first!
var express = require('express');
var app = express();
app.set('port', 3000);
app.use(express.static(__dirname + '/'));
app.listen(app.get('port'));
// Launch server, point to this file!