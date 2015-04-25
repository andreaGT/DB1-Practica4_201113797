var socket = io.connect("http://localhost:8080/"); 

var interval = setInterval(function(){
 	socket.emit('getdirs','/');
}, 1500);

socket.on('show', function (data) {
	 var rs="";
	 var primerBloque="";
	 var arr= JSON.parse(data);
	 var c=0;
	 for (key in arr) {
		 var obj = arr[key];
		 for (key2 in obj){
			 var obj2 = obj[key2];
			 if('S'== obj2.status || 's'== obj2.status ){
			 	primerBloque +="<tr><td>"+obj2.name
				 +"</td><td>"+obj2.pid
				 +"</td><td>"+obj2.status
				 +"</td><td>"+obj2.priority
				 +"</td><td>"+obj2.parent
				 +"</td></tr>";
			 } else {
			 	rs+="<tr><td>"+obj2.name
				 +"</td><td>"+obj2.pid
				 +"</td><td>"+obj2.status
				 +"</td><td>"+obj2.priority
				 +"</td><td>"+obj2.parent
				 +"</td></tr>";
			 }
		 }
 }
 
 document.getElementById("cc").innerHTML = 	'<table border="1">'+
 											'<tr><th>Nombre</th>'+
 											'<th>PID</th>'+
 											'<th>Estado</th>'+
 											'<th>Prioridad</th>'+
 											'<th>Padre</th></tr>'+
 											primerBloque+
 											rs+'</table>';
});


