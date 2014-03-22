var	util = require('util'),
	io   = require('socket.io');

var socket, players;

var playersConnected;

var gameStarted;

function init_game() {
	players = [];
	playersConnected = 0;
	socket = io.listen(8000);

	gameStarted = false;

	socket.configure(function() {
	    socket.set("transports", ["websocket"]);
	    socket.set("log level", 2);
	});

	setEventHandlers();
}

function setEventHandlers() {
	socket.sockets.on('connection', onSocketConnection);
}

function onSocketConnection(client) {
	util.log("New player: " + client.id);
	playersConnected++;
	client.emit("player count", {playercount: playersConnected});

	client.on("disconnect", lostClient);
}

function lostClient(client) {
	util.log("Client disconnected");
}

exports.init_game = init_game;