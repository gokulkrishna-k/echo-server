import { WebSocketServer } from "ws";

// const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", function connection(ws) {
//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//     ws.send(data);
//   });
//   console.log("Connected");
// });

// const WebSocket = require('ws');

const port = process.argv[2] || 8080;

const server = new WebSocketServer({ port: port });

server.on('connection', (socket, request) => {

  console.log(`New connection from - ${request.socket.remoteAddress}`);
  console.log(`RemotePort          - ${request.socket.remotePort}`);
  console.log(`LocalAddress        - ${request.socket.localAddress}`);
  console.log(`LocalFamily         - ${request.socket.localFamily}`);
  console.log(`LocalPort           - ${request.socket.localPort}`);

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`You sent: ${message}`);
  });

  // setTimeout(() => {
  //   console.log('Closing the connection after 10 seconds');
  //   socket.close(1000, 'Closing the connection after 10 seconds');
  // }, 10000);

  socket.on('close', (code, reason) => {
    console.log(`Client disconnected with code ${code} and reason "${reason}"`);

    // Handle the disconnect event
    switch (code) {
      case 1000:
        console.log('Normal closure, meaning that the purpose for which the connection was established has been fulfilled.');
        break;
      default:
        console.log('Closed due to an error.');
        break;
    }
  });
});


console.log(`WebSocket server listening on port ${port}`);