// Express setup
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var app = express();
app.set('port', 3000);

var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});
app.use(morgan('default'));

// For form textarea submit
// app.use(express.urlencoded({ extended: true }));

// For Ajax textarea submit
// app.use(express.json());

app.use(express.static(__dirname + '/client'));
app.listen(process.env.PORT || app.get('port'));

app.post('/', upload.single('document'), function(req, res) {
// app.post('/', function(req, res) {
  // res.setHeader('Content-Type','text/plain');
  fs.readFile(req.file.path, (err, data) => {
    if (err) throw err;

    var csv = jsonToCSV.parse(data.toString());
    res.setHeader('Content-Disposition', 'attachment;filename=result.csv');
    // res.set('Content-Type', 'text/csv');
    res.type('csv');
    res.send(csv);
  });
  // For form textarea submit
  // res.send(jsonToCSV.parse(req.body));
});

jsonToCSV = {
  parse: function(body) {
    var headers = [];
    var csvObjs = [];
    var csvRows = [];

    if (body[body.length - 1] === ';') {
      body = body.slice(0, body.length - 1);
    }
    
    // For form textarea submit
    // var jsonData = JSON.parse(body.JSONData);
    
    // For Ajax textare submit
    // var jsonData = body;
    
    // For file
    var jsonData = JSON.parse(body);
    
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
  }
}