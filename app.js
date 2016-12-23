var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).listen(3000);

var io = socketio.listen(server);
var player1, player2;

io.sockets.on('connection', function(socket) {
	socket.on("connected", function () {
		if (player1 === undefined) {
			player1 = socket.id;
			io.to(socket.id).emit("set_player", "player1")
			return;
		}

		if (player2 === undefined) {
			player2 = socket.id;
			io.to(socket.id).emit("set_player", "player2")
			return;
		}
	});

	socket.on("disconnect", function() {
		if (socket.id === player1) {
			player1 = undefined;
			return;
		}

		if (socket.id == player2) {
			player2 = undefined;
			return;
		}
	});

    socket.on('move_box', function(data) {
        socket.broadcast.emit('move_box', data);
    });
});

