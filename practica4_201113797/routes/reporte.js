var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    var pg = require('pg');
	var conString = "pg://postgres:123@localhost:5432/Practica4_db1";
	var client = new pg.Client(conString);

client.connect();
	var query = client.query("select \"FACTURA\".\"idFACTURA\", \"PASAJERO\".\"NOMBRE\" AS PASAJERO, \"FACTURA\".\"FECHA\", \"VIAJE\".\"ORIGEN\" AS ORIGEN_VIAJE, \"VIAJE\".\"DESTINO\" AS DESTINO_VIAJE, \"TICKET\".\"COSTO\" from \"FACTURA\", \"TICKET\", \"PASAJERO\", \"VIAJE\" WHERE \"PASAJERO\".\"idPASAJERO\" = \"FACTURA\".\"PASAJERO_idPASAJERO\"AND \"FACTURA\".\"idFACTURA\" = \"TICKET\".\"FACTURA_idFACTURA\" and \"VIAJE\".\"idVIAJE\"= \"TICKET\".\"VIAJE_idVIAJE\" ");
query.on("row", function (row, result) {
    result.addRow(row);
});

query.on("end", function (result) {
    var prob =""
    prob = JSON.stringify(result.rows, null, "    ");
   console.log(prob);
   client.end();
    res.render('reporte', { title: 'Bus Velocity', respuesta: prob });
});
});



module.exports = router;
