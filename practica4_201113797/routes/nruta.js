var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('nruta', { title: 'Bus Velocity' });
});

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.fname, complete: req.body.lname, capacidad:req.body.cname,text1: req.body.fname1, complete1: req.body.lname1, capacidad1:req.body.cname1, elim: req.body.idel, id: req.body.lt1};
    // Get a Postgres client from the connection pool
    var pg = require('pg');
	var conString = "pg://postgres:123@localhost:5432/Practica4_db1";
    pg.connect(conString, function(err, client, done) {
        
       client.query("INSERT INTO \"RUTA\"(\"ORIGEN\", \"DESTINO\") values('"+data.text+"', '"+data.complete+"')", 
            function(err, result) {
                if (err) {
                    console.log(err+"1");
                } 

              
                    client.end();
            });
    
	});
	res.render('nruta', { title: 'Bus Velocity' });
});

module.exports = router;
