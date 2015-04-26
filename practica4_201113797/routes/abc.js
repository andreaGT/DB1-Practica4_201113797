var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('abc', { title: 'Bus Velocity' });
});

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.fname, complete: req.body.lname};
    console.log(data.text);
    // Get a Postgres client from the connection pool
    var pg = require('pg');
	var conString = "pg://postgres:123@localhost:5432/Practica4_db1";
    pg.connect(conString, function(err, client, done) {
       client.query("INSERT INTO \"RUTA\"(\"ORIGEN\", \"DESTINO\") values('"+data.text+"', '"+data.complete+"')", 
            function(err, result) {
                if (err) {
                    console.log(err);
                } 

              
                    client.end();
            });        
    
	});
	res.render('abc', { title: 'Bus Velocity' });
});

module.exports = router;
