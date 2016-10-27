var path = require("path");
var express = require("express");
var socket = require("socket.io");
var body_parser = require("body-parser");

var app = express();
var io = socket.listen(app.listen(8080));

var messages = [];

app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "public/")));

app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "public/index.html"));
});

io.sockets.on("connection", function(socket) {
   console.log("> new client connected");
   socket.emit("chat-history", messages);

   socket.on("chat-message", function(message) {
      messages.push(message);
      io.sockets.emit("chat-message", message);
   });
   socket.on("disconnected", function() {
      console.log("> client disconnected");
   })
});