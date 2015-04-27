var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('nticket', { title: 'Bus Velocity' });
});

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.fname, complete: req.body.lname, capacidad:req.body.cname,text1: req.body.nname, complete1: req.body.gname, capacidad1:req.body.hname, elim: req.body.idel, id: req.body.lt1};
    // Get a Postgres client from the connection pool
    var pg = require('pg');
	var conString = "pg://postgres:123@localhost:5432/Practica4_db1";
    pg.connect(conString, function(err, client, done) {
        
       client.query("INSERT INTO \"TICKET\"(\"VIAJE_idVIAJE\",\"RESERVACION_idRESERVACION\",\"HRA_SALIDA\",\"HRA_LLEGADA\",\"COSTO\",\"FECHA\") values("+data.text+", "+data.complete+",'"+data.capacidad+"','"+data.text1+"',"+data.complete1+",'"+data.capacidad1+"')", 
            function(err, result) {
                if (err) {
                    console.log(err+"1");
                } 

              
                    client.end();
            });
    
	});
	res.render('nticket', { title: 'Bus Velocity' });
});

module.exports = router;
