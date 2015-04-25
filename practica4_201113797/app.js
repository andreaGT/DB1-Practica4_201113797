var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var abc = require('./routes/abc');
var reservacion = require('./routes/reservacion');
var reporte = require('./routes/reporte');
var help = require('./routes/help');

var pg = require('pg');

var conString = "pg://postgres:123@localhost:5432/Practica4_db1";

var client = new pg.Client(conString);

client.connect();


/*
client.query("SELECT * from \"TIPO_BUS\"");
console.log(result.rows[0].NOMBRE);
client.end();

client.connect();
client.query("SELECT * FROM mi_tabla", function (error, result){
    console.log(result.rows[0].campo_tabla);
}
console.log(error);
);*/

 //client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");


//Realizamos una consulta de prueba
/*client.query("SELECT * from \"TIPO_BUS\"", function(err, result) {
    if( result == undefined ){
        //Significa que no hay resultados =(
        console.log("No hay ni mamis");
    }else{
        //Mostramos los resultados =) así como vengan
        console.log(result);
    }
    // Se termina la conexión a Posgresql
    pg.end();
});
*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/ABC', abc);
app.use('/reservacion', reservacion);
app.use('/reporte', reporte);
app.use('/help', help);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var query = client.query("SELECT * FROM \"TIPO_BUS\"");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});

module.exports = app;
