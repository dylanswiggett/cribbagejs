var socket;

var boardCanvas;
var board2D;
var board_picture;

var board_picture_loaded = false;

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
	boardCanvas = document.getElementById('board_canvas');
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
	fitToContainer(boardCanvas);
	board2D.fillStyle = "rgb(10,10,50)";
	board2D.fillRect(0, 0, 100000, 100000);
}

function draw_board() {
	board2D.drawImage(board_picture, 0, 0);
}

function draw() {
	clearCanvases();
	if (board_picture_loaded) {
		draw_board();
	}
	board_picture.onload = function() {
		board_picture_loaded = true;
		draw_board();
	}
}

$( document ).ready(function() {
	init();
});

$ ( window ).resize(function() {
	draw();
	console.log("RESIZE");
});