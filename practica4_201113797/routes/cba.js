var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cba', { title: 'Bus Velocity' });
});

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text1: req.body.fname1, complete1: req.body.cond, capacidad1:req.body.cname1, id: req.body.lt1, dd: req.body.lname1};
    
    // Get a Postgres client from the connection pool
    var pg = require('pg');
	var conString = "pg://postgres:123@localhost:5432/Practica4_db1";
    pg.connect(conString, function(err, client, done) {
        
    try{
        
       client.query("UPDATE \"BUS\" SET \"TIPO_BUS_idTIPO_BUS\" = "+data.id+", \"CONDUCTOR\" = '"+data.dd+"', \"CAPACIDAD\" = "+data.capacidad1+" WHERE \"idBUS\" ="+data.text1, 
            function(err, result) {
                if (err) {
                    console.log(err +"3");
                } 

              
                    client.end();
            }); 
    }catch (err){
        console.log(err+"3.1")
    }
	});
	res.render('cba', { title: 'Bus Velocity' });
});

module.exports = router;
