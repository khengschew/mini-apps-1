var express = require('express');
var morgan = require('morgan');
var sequelize = require('sequelize');
var app = express();

app.use(morgan('default'));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.set('port', 3000);
app.listen(app.get('port'));

db = new sequelize('checkout', 'root', '', {
  dialect: 'mysql'
});

app.post('/', function(req, res) {
  
  res.send({'message':'received'});
});