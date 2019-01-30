// Express setup
var express = require('express');
var app = express();
app.set('port', 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/client'));
app.listen(process.env.PORT || app.get('port'));

app.post('/', function(req, res) {
  res.setHeader('Content-Type','text/plain');
  res.send(jsonToCSV.parse(req.body));
});

jsonToCSV = {
  parse: function(body) {
    var headers = [];
    var csvObjs = [];
    var csvRows = [];
    var jsonData = JSON.parse(body.JSONData);

    // console.log(jsonData);

    // Get object headers
    // var headers = Object.keys(json);

    // Loop through all keys:
    // Get value for keys, insert into csvRow
    // If children, then recursively call parse on children, append to results
    var rParse = function(obj) {
      var csvObj = {};

      for (var key in obj) {
        if (key !== 'children' && headers.includes(key) === false) {
          headers.push(key);
        }

        if (key === 'children') {
          for (var child of obj[key]) {
            rParse(child);
          }
        } else {
          csvObj[key] = obj[key];
        }
      }
      csvObjs.push(csvObj);
    };

    rParse(jsonData);
    console.log(csvObjs);
    
    // Loop through csvObjs:
      // Loop through headers:
        // Push value into csvRows[i]
    // When done with loop(s), unshift headers into csvRows
    for (var i = 0; i < csvObjs.length; i++) {
      for (var j = 0; j < headers.length; j++) {
        var currVal = csvObjs[i][headers[j]] || 'null';
        if(csvRows[i]) {
          csvRows[i].push(currVal);
        } else {
          csvRows[i] = [currVal];
        }
      }
      csvRows[i] = csvRows[i].toString();
    }
    csvRows.unshift(headers);

    return csvRows.join('\n');
    // return csvRows;
  }
}