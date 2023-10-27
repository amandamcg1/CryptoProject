const forge = require('node-forge');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});
// Mock database
let users = [];

io.on('connection', (socket) => {
  // Register user
  socket.on('register', (username) => {
    console.log('User connected', socket.id);
    console.log("registering user:", username)
      const { publicKey, privateKey } = generateKeyPair({bits: 512, e: 0x10001});

      users.push({
        id: socket.id,
        username: username,
        publicKey: publicKey
      })

      // users[socket.id] = {
      //     username: username,
      //     publicKey: publicKey
      // };

      // Send back the generated private key (ONLY ONCE, NEVER STORE THIS ON SERVER!)
      socket.emit('privateKey', privateKey);

      // Update users list for all connected clients
      // socket.emYit("newUserResponse", users);
      io.emit('users', users);
  });
  // Listen for encrypted messages and broadcast
  socket.on('encryptedMessage', ({ recipientId, encryptedMessage }) => {
      console.log("Recieved encryted message");
      console.log(recipientId);
      console.log(encryptedMessage);
      console.log(users);
      socket.to(recipientId).emit('receiveMessage', { sender: socket.id, encryptedMessage });
  });

  socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
      delete users[socket.id];
      io.emit('users', users);
  });
});

function generateKeyPair() {
    const rsaKeyPair = forge.pki.rsa.generateKeyPair(2048);
    return {
        publicKey: forge.pki.publicKeyToPem(rsaKeyPair.publicKey),
        privateKey: forge.pki.privateKeyToPem(rsaKeyPair.privateKey)
    };
}

server.listen(8080, () => {
  console.log(`listening on *:8080`);
});