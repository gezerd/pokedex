var mysql = require('mysql')
var express = require('express');
var app = express();
var path = require('path');

// create local server to host index.html on localhost
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// use Express middleware to serve static files in pokedex directory
app.use(express.static(__dirname));

// http://localhost:3000/pokedex
app.get('/pokedex', function (req, res) {
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : ''
	});

	connection.connect(function(err){
		if (err) {
			throw err;
		}
		console.log('MySql connected...');
	});

	connection.query('SELECT * FROM pokemon', function (err, rows, fields) {
	  if (err) throw err;
	  console.log('Query completed');
	  res.send(rows);
	});

	connection.end();
});

// Start the server
app.listen(3000);