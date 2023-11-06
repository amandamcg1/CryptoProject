
import { useEffect, useState } from "react";
import forge from 'node-forge';
import Grid from '@mui/material/Unstable_Grid2';

import io from "socket.io-client";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";

// const SERVER = "http://127.0.0.1:8080";
const SERVER = "https://somethingawesomeproject.onrender.com";
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
  const [loggedIn, setLoggedIn] = useState('');
  const [alertDisplay, setAlertDisplay] = useState('none');
  const [alertMessage, setAlertMessage] = useState('');

  function Alerted () {
    return (<>
    <Alert
      severity="error"
    >
      {alertMessage}
    </Alert>
    </>)
  }

  useEffect(() => {
    setTimeout(() => {
      setAlertDisplay('none')
    }, 5000);
  }, [])
  

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userName");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setLoggedIn(foundUser);
      setPrivateKey(localStorage.getItem('privateKey'));
      setUsername(foundUser);
      socket.emit('requestUsers');
    }

    return () => {
      socket.off('requestUsers');
    }
  }, [])

  useEffect(() => {
    socket.on('privateKey', (key) => {
      console.log("Received private key:", key); 
      localStorage.setItem('privateKey', key);
      setPrivateKey(key);
    });

    socket.on('publicKey', (key) => {
      localStorage.setItem('publicKey', key);
    })

    socket.on('users', (usersList) => {
      setUsers(usersList);
    });

    socket.emit('requestUsers');

    socket.on('receiveMessage', ({ sender, encryptedMessage }) => {
      setReceivedMessages(prev => [...prev, { sender: sender, message: encryptedMessage }]);
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
      socket.off('requestUsers');
  };

  }, []);

  const register = () => {
    if (username.length === 0) {
      setAlertMessage("Please enter a username");
      setAlertDisplay('block');
      return;
    }
    if (username.length > 12) {
      setAlertMessage("Username must be less than or 12 characters");
      setAlertDisplay('block');
      return;
    }
    socket.emit('register', username);
    setLoggedIn(username);
    localStorage.setItem('userName', username);
  };

  const logoff = () => {
    localStorage.clear();
    setLoggedIn('');
    setUsername('');
    setPrivateKey('');
    socket.emit('logoff');
  }

  const sendMessage = () => {
    if (message.length === 0) {
      setAlertMessage("Enter a message");
      setAlertDisplay('block');
      return;
    }
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
      setAlertMessage("Enter a message");
      setAlertDisplay('block');
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
      setAlertMessage(err);
      setAlertDisplay('block');
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
      setAlertMessage(err);
      setAlertDisplay('block');
      return;
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
      <Box 
        display={alertDisplay}
        sx={{ mt: '80px', mb: '-60px', mr: '20px', ml: '20px'}}
      >
          <Alerted /> 
      </Box>
      <div>
        {!loggedIn ? (
        <div style={{ minHeight: '80vh' }}>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', flexDirection: 'column'}}>
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
                <button onClick={logoff} className='leaveChat__btn' style={{ color: 'white'}}>LEAVE CHAT</button>
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
                
                <Box height='60vh' sx={{ width: '100%',  mb: '30px'}}>
                  <Typography sx={{ textAlign: 'center', width: '100%', backgroundColor: 'primary.main', pt: 1, pb: 1, color: 'white', fontSize: '14pt'}}>{username}</Typography>
                  <div style={{ height: '100%', overflowY: 'scroll'}}>
                  {receivedMessages.map((message, index) => (
                    <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                      <div className="sender__user">{message.sender}</div>
                      <div style={{ width: '90%', textAlign: 'right'}}>

                      <TextField 
                        maxRows={4}
                        minRows={1}
                        multiline
                        variant="standard"
                        value={message.message}
                        aria-readonly
                        sx={{ width: 'calc(100% - 110px)', padding: '10px 0' }}
                      />
                      <Button sx={{ m: 1,}} onClick={() => handleDecryptClick(index)} variant="outlined" color="secondary" size="small">Decrypt</Button>
                      </div>
                    </div>
                  </div>
                  ))}
                  </div>
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
