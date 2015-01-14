function loadBasemap(){
	var canvas = document.getElementById('gameCanvas');

	var context = canvas.getContext('2d');

	context.beginPath();
	context.arc(100,300,30,0,2*Math.PI,true);
	context.fill();
}