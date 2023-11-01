const forge = require('node-forge');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"https://somethingawesomeproject-fxuk.onrender.com", methods: ["GET", "POST"]},
});

let users = [];

io.on('connection', (socket) => {  
  socket.on('register', (username) => {
    console.log("registering user:", username, " ", socket.id)
      const { publicKey, privateKey } = generateKeyPair({bits: 512, e: 0x10001});

      users.push({
        id: socket.id,
        username: username,
        publicKey: publicKey
      })
      
      // Send back the generated private key (ONLY ONCE, NEVER STORE THIS ON SERVER!)
      socket.emit('privateKey', privateKey);
      socket.emit('publicKey', publicKey);

      // Update users list for all connected clients
      // socket.emYit("newUserResponse", users);
      io.emit('users', users);
  });

  socket.on('requestUsers', () => {
    socket.emit('users', users);
  });

  socket.on('users', () => {
    io.emit('users', users);
  })
  // Listen for encrypted messages and broadcast
  socket.on('encryptedMessage', ({ recipientId, encryptedMessage }) => {
    console.log("Recieved encryted message");
    console.log(recipientId);
    console.log(encryptedMessage);
    console.log(users);
    const senderUser = users.find(user => user.id === socket.id);
    if (senderUser) {
      const senderUsername = senderUser.username;
      socket.to(recipientId).emit('receiveMessage', { sender: senderUsername, encryptedMessage });
    }
  });

  socket.on('logoff', () => {
    console.log('User Logged Off');
    users = users.filter(user => user.id !== socket.id);
    io.emit('users', users);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
    users = users.filter(user => user.id !== socket.id);
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

const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});