var express = require('express');
var router = express.Router();

var pg = require('pg');

var conString = "pg://postgres:123@localhost:5432/Practica4_db1";

var client = new pg.Client(conString);

client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {

	var query = client.query("select \"FACTURA\".\"idFACTURA\", \"PASAJERO\".\"NOMBRE\" AS PASAJERO, \"FACTURA\".\"FECHA\", \"RUTA\".\"ORIGEN\" AS ORIGEN_RUTA, \"RUTA\".\"DESTINO\" AS DESTINO_RUTA, \"VIAJE\".\"ORIGEN\" AS ORIGEN_VIAJE, \"VIAJE\".\"DESTINO\" AS DESTINO_VIAJE, \"TICKET\".\"COSTO\" from \"FACTURA\", \"RUTA\", \"VIAJE\", \"TICKET\", \"PASAJERO\", \"RUTA_VIAJE\" WHERE \"FACTURA\".\"idFACTURA\" = \"TICKET\".\"FACTURA_idFACTURA\" AND \"VIAJE\".\"idVIAJE\"= \"TICKET\".\"VIAJE_idVIAJE\" AND \"RUTA_VIAJE\".\"VIAJE_idVIAJE\" = \"VIAJE\".\"idVIAJE\" AND \"RUTA_VIAJE\".\"RUTA_idRUTA\" = \"RUTA\".\"idRUTA\"");

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
