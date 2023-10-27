import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Navigation from "./components/Navigation";
import Simulation from "./components/Simulation";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import forge from 'node-forge';

import io from "socket.io-client";
import ChatApp from "./ChatApp";
const SERVER = "http://127.0.0.1:8080";
const socket = io(SERVER);
function App() {
  
  const [username, setUsername] = useState('');
  const [privateKey, setPrivateKey] = useState(null);
  const [users, setUsers] = useState({});
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    socket.on('privateKey', (key) => {
      console.log("Received private key:", key); // <-- Add this line
      setPrivateKey(key);
    });

    socket.on('users', (usersList) => {
      setUsers(usersList);
      delete usersList[socket.id]; // remove the current user
    });

    socket.on('receiveMessage', ({ sender, encryptedMessage }) => {
      if (privateKey) {
        const decryptedMessage = decryptMessage(encryptedMessage, privateKey);
        setReceivedMessages(prev => [...prev, { sender: users[sender].username, message: decryptedMessage }]);
      }
    });

  }, [privateKey]);

  const register = (e) => {
    console.log("Yess")
    socket.emit('register', username);
  };

  const sendMessage = () => {
    if (recipientId && users[recipientId]) {
      const encryptedMessage = encryptMessage(message, users[recipientId].publicKey);
      socket.emit('encryptedMessage', { recipientId, encryptedMessage });
    }
  };

  const encryptMessage = (message, publicKeyPem) => {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(message, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  };

  const decryptMessage = (encryptedMessage, privateKeyPem) => {
    const decryptedPrivateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decrypted = decryptedPrivateKey.decrypt(forge.util.decode64(encryptedMessage), 'RSA-OAEP');
    return decrypted;
  };

  return (
    <Router>
      <Navigation/>
      <Box width='100%' sx={{ mt: '50px'}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/simulation" element={<Simulation/>} />
          <Route path="/chat" element={<ChatApp/>} />
        </Routes>
      </Box>
    
    </Router>
  );
}

export default App;
