player = require('./res/res/player');

var	util = require('util'),
	io   = require('socket.io');

var socket, players;

var playersConnected;

var gameStarted;

var minPlayers = 2;

function init_game() {
	players = {};
	playersConnected = 0;
	socket = io.listen(8000);

	gameStarted = false;
	gameRunning = false;

	socket.configure(function() {
	    socket.set("transports", ["websocket"]);
	    socket.set("log level", 2);
	});

	setEventHandlers();
}

function setEventHandlers() {
	socket.sockets.on('connection', onSocketConnection);
	socket.sockets.on('set name', onSetName);
}

function onSocketConnection(client) {
	util.log("New player: " + client.id);
	playersConnected++;
	players[client] = new player.Player(client.id);

	setClientHandlers(client);

	client.emit("player count", {playercount: playersConnected});
	if (playersConnected >= minPlayers) {
		socket.emit("start game");
	} else {
		socket.emit("waiting for players");
	}
}

function setClientHandlers(client) {
	client.on("disconnect", lostClient);
}

function onSetName(client, data) {
	players[client].setName(data.name)
}

function lostClient(client) {
	util.log("Client disconnected");
	playersConnected--;
	socket.emit("player disconnected");
	gameRunning = false;
}

exports.init_game = init_game;