import React, { useState } from 'react';
import forge from 'node-forge';
import { Box, Button, FormControl, Grid, InputLabel, List, ListItem, NativeSelect, TextField, TextareaAutosize, ThemeProvider, Typography } from '@mui/material';
import theme from '../Theme';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

function Simulation () {
  const [keySize, setKeySize] = useState(512);
  const [keys, setKeys] = useState(null);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [enteredPublicKey, setEnterPublicKey] = useState('');
  const [enteredPrivateKey, setEnterPrivateKey] = useState('');

  const generateKeys = () => {
    const rsa = forge.pki.rsa;
    rsa.generateKeyPair({bits: keySize, workers: -1}, (err, keypair) => {
      setKeys(keypair);
      console.log(keypair.publicKey)
      setPublicKey(forge.pki.publicKeyToPem(keypair.publicKey));
      console.log(forge.pki.publicKeyToPem(keypair.publicKey))
      setPrivateKey(forge.pki.privateKeyToPem(keypair.privateKey));

      console.log('Modulus (n):', keypair.publicKey.n.toString(16));  // Modulus in hexadecimal
      console.log('Exponent (e):', keypair.publicKey.e.toString());   // Exponent as a decimal
    });
    console.log(publicKey)
  };

  const encryptMessage = () => {
    if (enteredPublicKey.length < 1) {
      alert('Enter Encrytpion Key');
      return;
    } else if (plaintext.length < 1) {
      alert('Enter a message');
      return;
    }
    const key = "-----BEGIN PUBLIC KEY-----\n" + enteredPublicKey + '\n-----END PUBLIC KEY-----';
    try {
      const publicKey = forge.pki.publicKeyFromPem(key);
      const encrypted = publicKey.encrypt(plaintext, 'RSA-OAEP');
      setCiphertext(forge.util.encode64(encrypted));
    } catch (err){
      alert(err);
      return;
    }
  };

  const decryptMessage = () => {
    if (enteredPrivateKey.length < 1) {
      alert('Enter Decryption Key');
      return;
    } else if (ciphertext.length < 1) {
      alert('Encrypt a message');
      return;
    }
    const key = "-----BEGIN RSA PRIVATE KEY-----\n" + enteredPrivateKey + "\n-----END RSA PRIVATE KEY-----";
    try {
      const decryptedMessage = forge.pki.privateKeyFromPem(key).decrypt(forge.util.decode64(ciphertext), 'RSA-OAEP');
      setDecrypted(decryptedMessage);
    } catch (err) {
      alert(err);
      return;
    }
  };
 

  return(<>
  <ThemeProvider theme={theme}>
    <Box sx={{ 
      height: '180px', 
      backgroundColor: 'primary.main', 
      borderRadius: '0 0 15px 15px', 
      width: '100%', 
      justifyContent: 'center', 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      <Typography variant='h4' color='white'>RSA Cyrptography</Typography>
    </Box>
    <Box width='90%' m='auto' mt='30px'>
      <Typography mb='10px'>
        RSA stands for Rivest-Shamir-Adleman, named after its inventors Ron Rivest, Adi Shamir, and Leonard Adleman.
        In RSA, two distinct keys are involved: a public key, which can be shared openly, and a private key, which remains confidential. Data that is encrypted with the public key can only be decrypted by the corresponding private key, and vice versa.
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' mb='5px'>Advantages:</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>Security: When using large key sizes, RSA is considered highly secure. The security is based on the difficulty of the prime factorization problem.</ListItem>
              <ListItem sx={{ display: 'list-item' }}>Asymmetric: RSA's asymmetric nature allows for the public key to be distributed freely without compromising the private key, ensuring secure communication.</ListItem>
              <ListItem sx={{ display: 'list-item' }}>Digital Signatures: RSA can be used to digitally sign an electronic document, verifying its authenticity and integrity.</ListItem>
            </List>
        </Grid>
        <Grid item xs={12} sm>
          <Typography variant='h6' mb='5px'>Disadvantages:</Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>Performance: RSA operations are computationally intensive and are generally slower than symmetric encryption methods.</ListItem>
              <ListItem sx={{ display: 'list-item' }}>Key Size: For the same level of security, RSA requires much larger key sizes than symmetric algorithms.</ListItem>
              <ListItem sx={{ display: 'list-item' }}>Vulnerabilities: Though rare, mathematical advances or sufficiently powerful quantum computers in the future might pose threats to RSA.</ListItem>
            </List>
        </Grid>
      </Grid>

      <Typography mb='10px' variant='h4' textAlign='center'>Key Generation</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={7}>
          <Grid container>
            <Typography sx={{ backgroundColor: 'secondary.light', p: 2, borderRadius: '6px', width: '100%'}} textAlign="center" fontSize={17}>Chose a bit size and generate your two keys</Typography>
            <Grid item xs={12} md={6} textAlign='center' mb='15px' p={1}>
              Public Key
              <TextField
                variant='outlined'
                minRows={4}
                maxRows={6}
                fullWidth
                multiline
                sx={{ mb: '10px',}}
                placeholder="Public Key"
                value={publicKey} 
                onChange={(e) => setPublicKey(e.target.value)}
              />
              <Button 
                variant='contained' 
                size='small'
                onClick={() => {navigator.clipboard.writeText(publicKey.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").trim())}}
              >
                copy
              </Button>
            </Grid>
            <Grid item xs={12} md={6} mb='15px' textAlign='center' p={1}>
              Private Key
              <TextField
                variant='outlined'
                minRows={4}
                maxRows={6}
                fullWidth
                multiline
                sx={{ mb: '10px',}}
                placeholder="Private Key"
                value={privateKey} 
                onChange={(e) => setPrivateKey(e.target.value)}
              />
              <br/>
              <Button 
                variant='contained' 
                size='small'
                onClick={() => {navigator.clipboard.writeText(privateKey.replace("-----BEGIN RSA PRIVATE KEY-----", "").replace("-----END RSA PRIVATE KEY-----", "").trim())}}>
                copy
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} mb='10px' textAlign='center' p={1}>
              <FormControl color='secondary' sx={{ m: '10px' }}>
                <InputLabel variant="outline" htmlFor="uncontrolled-native">Bits</InputLabel>
                <NativeSelect
                  defaultValue={512}
                  inputProps={{
                    name: 'bits',
                    id: 'uncontrolled-native',
                  }}
                  onChange={(e) => setKeySize(Number(e.target.value))}
                >
                  <option value={512}>512 bit</option>
                  <option value={1024}>1024 bit</option>
                  <option value={2048}>2048 bit</option>
                  <option value={3072}>3072 bit</option>
                  <option value={4096}>4096 bit</option>
                </NativeSelect>
              </FormControl>
              <Button variant="contained" color='secondary' onClick={generateKeys} sx={{ m: '20px' }}>Generate Keys</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md p={1}>
          <Typography mb='10px' variant='h6' textAlign='center'>How RSA public and private keys are generated</Typography>
          <Typography>
            The bit size dictates how long the RSA key will be. This determines the size of the 
            modulus <InlineMath math='n'/>, which is a large number that is the product of two prime 
            numbers <InlineMath math='n=pq'/> The numbers <InlineMath math='p'/> and <InlineMath math='q'/> are 
            typically randomly generated prime numbers that are roughly half the bit size of <InlineMath math='n'/>.
            The larger the bit size, the more secure the key pair, but also the slower it will be to perform encryption 
            and decryption operations. The Euler totient of <InlineMath math='n'/> is then calculated <BlockMath math='ϕ(n)=(p-1)(q-1)'/>.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} p={1}>
          <Typography mb='10px'>
          A public exponent <InlineMath math='e'/> which is greater than 1 and less than the Euler totients of <InlineMath math='n'/> is chosen. <InlineMath math='e'/> must also be coprime to <InlineMath math='ϕ(n)'/>.  A private exponent <InlineMath math='d'/> is then calculated as the modular inverse of <InlineMath math='e'/> modulo the Euler totient of <InlineMath math='n'/>. This means <InlineMath math='de\equiv1\modϕ(n)'/>. This is efficiently computed using the extended Euclidean algorithm.
          </Typography>
          <Typography mb='10px'>
            The public key is <InlineMath math='(n,e)'/> and the private key is <InlineMath math='(n,d)'/>. The public and private key is then showed in PEM format which is the standard format for storing public and private keys.
          </Typography>
        </Grid>
      </Grid>
      <Typography mb='10px' variant='h4' textAlign='center'>Encryption</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={7}>
          <Grid container>
            <Typography sx={{ backgroundColor: 'secondary.light', p: 2, borderRadius: '6px', width: '100%'}} textAlign="center" fontSize={17}>Enter in some plain text and copy and paste the Public Key above</Typography>
            <Grid item xs={12} lg={6} textAlign='center' mb='15px' p={1}>
              <TextField
                variant='outlined'
                minRows={4}
                maxRows={6}
                fullWidth
                multiline
                sx={{ mb: '10px',}}
                placeholder="Enter plain text"
                onChange={(e) => setPlaintext(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={6} mb='15px' textAlign='center' p={1}>
              <TextField
                variant='outlined'
                minRows={4}
                maxRows={6}
                fullWidth
                multiline
                sx={{ mb: '10px',}}
                placeholder="Encryption Key (copy public key text)"
                onChange={(e) => setEnterPublicKey(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} mb='10px' textAlign='center' p={1}>
              <Button variant='contained' color='secondary' onClick={encryptMessage} sx={{ m: '10px' }}>
                Encrypt
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md p={1}>
          <Typography mb='10px' variant='h6' textAlign='center'>How RSA Encryption works</Typography>
          <Typography>
            Before starting the encryption process, the plaintext message is converted into a numerical representation. 
            Each character in the message is mapped to its corresponding ASCII value.
            <br/><br/>
            Taking a simple message like "AB", it's converted into 6566 as 'A' becomes 65 and 'B' becomes 66.
            This numerical value is what's actually encrypted using the RSA algorithm.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} p={1}>
          <Typography mb='10px'>
            To encrypt a message using RSA, the plaintext message <InlineMath math='m'/> is raised to the power of the 
            public exponent <InlineMath math='e'/>, and the result is taken modulo <InlineMath math='n'/>.
            <BlockMath math='c = m^e\mod n'/>
            For example, if we take a message <InlineMath math='m = 12'/>, with a public exponent <InlineMath math='e = 3'/>
            and modulus <InlineMath math='n = 55'/>, the encrypted message <InlineMath math='c'/> would be:
            <BlockMath math='c = 12^3\mod 55 = 18'/>
          </Typography>
        </Grid>
      </Grid>
      <Typography mb='10px' variant='h4' textAlign='center'>Decryption</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={7}>
          <Grid container textAlign='center'>
            <Typography sx={{ backgroundColor: 'secondary.light', p: 2, borderRadius: '6px', width: '100%'}} textAlign="center" fontSize={17}>Copy and Paste the Private Key to get decrypted message</Typography>
            <Grid item xs={12} lg={6} textAlign='center' mb='15px' p={1}>
              <TextField
                variant='outlined'
                minRows={4}
                maxRows={6}
                fullWidth
                multiline
                sx={{ mb: '10px',}}
                placeholder="Encrypted Message"
                value={ciphertext} 
                readOnly
                onChange={(e) => setCiphertext(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={6} mb='15px' textAlign='center' p={1}>
              <TextField
                variant='outlined'
                minRows={4}
                maxRows={6}
                fullWidth
                multiline
                sx={{ mb: '10px',}}
                placeholder="Decryption Key (add the private key or try other keys)"
                onChange={(e) => setEnterPrivateKey(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} mb='10px' textAlign='center' p={1}>
              <Button variant='contained' color='secondary' onClick={decryptMessage} sx={{ m: '10px' }}>
                Decrypt
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md p={1}>
          <Typography mb='10px' variant='h6' textAlign='center'>How RSA decryption works</Typography>
          
          <Typography>
            RSA decryption is the inverse process of encryption. Using the private exponent <InlineMath math='d'/> and 
            the modulus <InlineMath math='n'/>, the original plaintext message <InlineMath math='m'/> is retrieved from the ciphertext 
            <InlineMath math='m'/> as:
            <BlockMath math='m = c^d \mod n'/>
            Using our earlier example with ciphertext <InlineMath math='c = 23'/> and a private exponent <InlineMath math='d = 27'/>, 
            and modulus <InlineMath math='n = 55'/>, the decryption would yield a message <InlineMath math='m'/> based on the equation:
            <BlockMath math='m=23^27 \mod 55'/>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} p={1}>
          <Typography mb='10px'>
            However, determining the exact value of <InlineMath math='m'/> requires the precise private exponent <InlineMath math='d'/> that
            corresponds to the public exponent <InlineMath math='e'/> and <InlineMath math='\phi(n)'/>. In practice, only the holder of 
            the correct private key can accurately and securely recover the original message.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} p={1} mb={3}>
        <Typography variant='h5' mb='10px' textAlign='center'>Result</Typography>
          <TextField
            variant='outlined'
            minRows={4}
            maxRows={6}
            fullWidth
            multiline
            placeholder="Result"
            value={decrypted}
          />
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider> 
  </>)
}

export default Simulation;
