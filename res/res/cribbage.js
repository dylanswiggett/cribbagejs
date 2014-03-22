var socket;

var cardCanvas;
var boardCanvas;
var card2D;
var board2D;
var board_picture;

function init() {
	init_socket();
	console.log("Initiliazed cribbage connection.");
	
	board_picture = new Image();
	board_picture.src = 'res/cribbage_board.png';
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
	card2D = cardCanvas.getContext('2d');
	board2D = boardCanvas.getContext('2d');
	draw();
}

function fitToContainer(canvas){
	canvas.style.width ='100%';
	canvas.style.height='100%';
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

function clearCanvases() {
	fitToContainer(cardCanvas);
	fitToContainer(boardCanvas);
	card2D.fillStyle = "rgb(0,0,0)";
	card2D.fillRect(0, 0, 100000, 100000);
	board2D.fillStyle = "rgb(10,10,50)";
	board2D.fillRect(0, 0, 100000, 100000);
}

function draw() {
	clearCanvases();
	card2D.font = "15pt Arial"
	card2D.fillStyle = "rgb(100, 0, 0)";
	card2D.fillRect(20, 20, 100, 100);
	card2D.fillText("Testing text", 200, 200);
	board_picture.onload = function() {
		board2D.drawImage(board_picture, 0, 0);
	}
}

$( document ).ready(function() {
	init();
});

$ ( window ).resize(function() {
	draw();
	console.log("RESIZE");
});