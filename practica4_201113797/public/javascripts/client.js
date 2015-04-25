var socket = io.connect(document.location.href); 
socket.on('message', function (data) {
 socket.emit('nono',data);
});

//Creo el intervalo que ejecuta getdirs desde el servidor para decirle que obtenga la cadena json con la información de los procesos
var interval = setInterval(function(){
 socket.emit('getdirs','/');
	}, 1500);

//Aquí se manda a imprimir data, en este caso la cadena json
socket.on('show', function (data) {
 var rs="";
 var arr= JSON.parse(data);
 var c=0;
 for (key in arr) {
  var obj = arr[key];
  for (key2 in obj){
   var obj2 = obj[key2];
   rs+="<tr><td>"+obj2.name+"</td><td>"+obj2.pid+"</td><td>"+obj2.status+"</td><td>"+obj2.priority+"</td><td>"+obj2.parent+"</td></tr>";
  }
 }
 
 document.getElementById("cc").innerHTML = '<table border="1"><tr><th>Nombre</th><th>PID</th><th>Estado</th><th>Prioridad</th><th>Padre</th></tr>'+rs+'</table>';
});


