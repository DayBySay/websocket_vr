var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).listen(process.env.PORT || 3000);

var io = socketio.listen(server);
var player1, player2;

io.sockets.on('connection', function(socket) {
    socket.on("connected", function (peerid) {
        if (player1 === undefined) {
			player1 = {};
            player1.socketid = socket.id;
			player1.peerid = peerid;
            io.to(socket.id).emit("set_player", "player1");
            return;
        }

        if (player2 === undefined) {
			player2 = {};
            player2.socketid = socket.id;
			player2.peerid = peerid;
            io.to(socket.id).emit("set_player", "player2");
			io.to(socket.id).emit("call", player1.peerid);
            return;
        }
    });

    socket.on("disconnect", function() {
        if (socket.id === player1.socketid) {
            player1 = undefined;
            return;
        }

        if (socket.id == player2.socketid) {
            player2 = undefined;
            return;
        }
    });

    socket.on("click-square", function(square_id, player_id) {
        socket.broadcast.emit("click-square",square_id, player_id);
    });
});

