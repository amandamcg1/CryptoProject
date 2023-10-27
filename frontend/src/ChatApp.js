
import { useEffect, useState } from "react";
import forge from 'node-forge';
import Grid from '@mui/material/Unstable_Grid2';

import io from "socket.io-client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
const SERVER = "http://127.0.0.1:8080";
const socket = io(SERVER);
export default function ChatApp() {
  
  const [username, setUsername] = useState('');
  const [privateKey, setPrivateKey] = useState(null);
  const [users, setUsers] = useState([]);
  const [recipientId, setRecipientId] = useState('');
  const [recepientUser, setRecepientUser] = useState('');
  const [recepientPublicKey, setRecepientPublicKey] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [loggedin, setLoggedin] = useState();

  useEffect(() => {
    if (localStorage.getItem('logged')) {
      setLoggedin(true);
    }

    socket.on('privateKey', (key) => {
      console.log("Received private key:", key); 
      setPrivateKey(key);
    });

    socket.on('users', (usersList) => {
      setUsers(usersList);
    });

    socket.on('receiveMessage', ({ sender, encryptedMessage }) => {
      var sentBy = '';
      for (const item of users) {
        console.log(item);
        if (item.id === sender) {
          sentBy = item.username;
        }
      }
      console.log(sentBy);
      setReceivedMessages(prev => [...prev, { sender: sentBy, message: encryptedMessage }]);

      // if (privateKey) {
      //   const decryptedMessage = decryptMessage(encryptedMessage, privateKey);
      //   setReceivedMessages(prev => [...prev, { sender: users[sender].username, message: decryptedMessage }]);
      // }
    });

    return () => {
      // This will be called when the component unmounts
      socket.off('privateKey');
      socket.off('users');
      socket.off('receiveMessage');
  };

  }, []);

  const register = () => {
    if (username.length === 0) {
      alert('Please enter a username');
      return;
    }
    localStorage.setItem('logged', username);
    socket.emit('register', username);
  };

  const sendMessage = () => {
    const encryptedMessage = message;
    setMessage('');
    socket.emit('encryptedMessage', { recipientId, encryptedMessage });
    if (recipientId && users[recipientId]) {
      // const encryptedMessage = encryptMessage(message, users[recipientId].publicKey);
      // socket.emit('encryptedMessage', { recipientId, message });
    }
  };

  const encryptMessage = () => {
    console.log(message);
    if (message.length === 0) {
      alert('Enter a message');
      return;
    }
    console.log(recepientPublicKey);
    try {
      const publicKey = forge.pki.publicKeyFromPem(recepientPublicKey);
      const encrypted = publicKey.encrypt(message, 'RSA-OAEP');
      console.log(publicKey);
      console.log(encrypted);
      console.log(forge.util.encode64(encrypted));
      setMessage(forge.util.encode64(encrypted));
    } catch (err){
      alert(err);
      return;
    }
    // return forge.util.encode64(encrypted);
  };

  const decryptMessage = (encryptedMsg) => {
    try {
      const decryptedPrivateKey = forge.pki.privateKeyFromPem(privateKey);
      const decrypted = decryptedPrivateKey.decrypt(forge.util.decode64(encryptedMsg), 'RSA-OAEP');
      return decrypted;
    } catch (err) {
      alert(err);
      return null;
    }
  };

  const handleDecryptClick = (index) => {
    const decrypted = decryptMessage(receivedMessages[index].message);
    if (decrypted) {
      const newMessages = [...receivedMessages];
      newMessages[index].message = decrypted;
      setReceivedMessages(newMessages);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {!privateKey ? (
        <div style={{ minHeight: '80vh' }}>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '90vh', flexDirection: 'column'}}>
            <TextField
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter a username"
            />
            <Button 
              variant='contained' 
              onClick={register}
              color="secondary"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            
          </div>
        </div>
      
        ) : (
          <div>
            <Grid container gap={3} mt={8}>
              <Grid item xs={3} sm={4} md={2} mt={2} textAlign='center'>
                <Box>
                <button className='leaveChat__btn'>LEAVE CHAT</button>
                <h4  className='chat__header'>ACTIVE USERS</h4>
                  {Object.entries(users).map(([id, user]) => (
                    user.username === username ? null :
                    <>
                      <Button 
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ m: '5px' }}
                        key={id} 
                        onClick={() => { 
                          setRecipientId(user.id); 
                          setRecepientUser(user.username); 
                          setRecepientPublicKey(user.publicKey); 
                      }}>
                        {user.username}
                      </Button>
                    </>
                  ))}
                </Box>
              </Grid>
              <Grid item xs sm md p={2}>
                
                <Box height='65vh' sx={{ width: '100%'}}>
                  <Typography sx={{ textAlign: 'center', width: '100%', backgroundColor: 'primary.main', pt: 1, pb: 1, color: 'white', fontSize: '14pt'}}>{username}</Typography>
                  {receivedMessages.map((message, index) => (
                    <div key={index}>
                      <TextField 
                        maxRows={4}
                        minRows={1}
                        multiline
                        variant="standard"
                        value={message.message}
                        aria-readonly
                        sx={{ width: '70%' }}
                      />
                      <Button onClick={() => handleDecryptClick(index)}>Decrypt</Button>

                      {/* {message.sender} {message.message} */}
                    </div>
                  ))}
                </Box>
                <Box >
                  <Typography>Send To: {recepientUser}</Typography>
                  {recepientUser === '' ? 
                    <TextField fullWidth maxRows={3} value={message} onChange={(e) => setMessage(e.target.value)} disabled label="Disabled: Select a user"/>
                    : <TextField fullWidth maxRows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`sending message to: ${recepientUser}`} />
                  }
                  <Box sx={{ width: '100%', textAlign: 'center'}}>
                    <Button variant="contained" onClick={encryptMessage} sx={{ m: 2 }}>Encrypt</Button>
                  <Button variant="outlined" color="secondary" onClick={sendMessage} sx={{ m: 2 }}>Send</Button>
                  </Box>
                 
                  </Box>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
