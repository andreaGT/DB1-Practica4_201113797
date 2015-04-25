var express = require('express');
var router = express.Router();
/*
var socket = io.connect("http://localhost:3000/abc"); 

function getDirs(){
socket.emit('getdirs','pagina3');
}
//socket.emit('getdirs','pagina2');

socket.on('show', function (data) {
var rs="";
var arr= JSON.parse(data);
var c=0;
for (key in arr) {
	var obj = arr[key];
	for (key2 in obj){
		var obj2 = obj[key2];
		rs +="<tr><td>"+obj2.name
				 +"</td><td>"+obj2.pid
				 +"</td><td>"+obj2.status
				 +"</td><td>"+obj2.priority
				 +"</td><td>"+obj2.parent
				 +"</td></tr>";
	}
 }
 
 document.getElementById("listo").innerHTML = '<table border="1">'+
 											'<tr><th>Nombre</th>'+
 											'<th>PID</th>'+
 											'<th>Estado</th>'+
 											'<th>Prioridad</th>'+
 											'<th>Padre</th></tr>'+
 											rs+'</table>';

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('abc', { title: 'Bus Velocity' });
});

module.exports = router;
