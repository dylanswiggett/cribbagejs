var socket;

var cardCanvas;
var boardCanvas;
var card2D;
var board2D;

function init() {
	init_socket();
	console.log("Initiliazed cribbage connection.");
	init_website();
}

function init_socket() {
	socket = io.connect("http://localhost", 
		{port: 8000, transports:['websocket']});

	setEventHandlers();
}

function setEventHandlers() {
	socket.on("player count", setPlayerCount);
}

function setPlayerCount(data) {
	$("#test_text").text("You are player #" + data.playercount);
}

function init_website() {
	cardCanvas = document.getElementById('card_canvas');
	boardCanvas = document.getElementById('board_canvas');
	fitToContainer(cardCanvas);
	fitToContainer(boardCanvas);
	card2D = cardCanvas.getContext('2d');
	console.log('Initialized card canvas, ' + cardCanvas.width + 'x' + cardCanvas.height);
	card2D.fillStyle = "rgb(200,0,0)";
	card2D.fillRect(10, 10, 100, 100);
	board2D = boardCanvas.getContext('2d');
}

function fitToContainer(canvas){
	// Make it visually fill the positioned parent
	canvas.style.width ='100%';
	canvas.style.height='100%';
	// ...then set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

$( document ).ready(function() {
	init();
});

$ (document).resize(function() {
	fitToContainer(cardCanvas);
	fitToContainer(boardCanvas);
});