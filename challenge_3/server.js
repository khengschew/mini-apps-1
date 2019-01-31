var express = require('express');
var morgan = require('morgan');
var mysql = require('mysql');
var app = express();

app.use(morgan('default'));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Set CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.set('port', 3000);
app.listen(app.get('port'));

// Define database connection
var sendQuery = (query, done) => {
  var dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'checkout'
  });
  dbConnection.connect();

  dbConnection.query(query, done);

  dbConnection.end();
};

app.post('/', function(req, res) {
  if (Object.keys(req.body).length === 0) {
    var queryString = 'INSERT INTO checkouts () VALUES ()';
    sendQuery(queryString, (err, results) => {
      res.send({'checkoutId':results.insertId});
    })
  } else {
    // New method:
    // Use object.keys and object.values
    // Also need to tweak client to send checkoutId
    var queryString = 'UPDATE checkouts SET ';
    var checkoutId = req.body['checkoutId'];
    delete req.body.checkoutId;

    var keys = Object.keys(req.body);

    var pairs = keys.map((key, index) => {
      return `${key} = ${req.body[keys[index]]}`;
    });

    queryString += pairs.join(',');
    queryString += ` WHERE id = ${checkoutId}`;

    sendQuery(queryString, (err, results) => {
      res.send({'message':'received'});
    })
  }
});