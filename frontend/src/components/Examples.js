import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

const RSA = (
  <>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          RSA (Rivest-Shamir-Adleman)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
        <Typography color="text.secondary">
          Usage
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          RSA can be used for both encryption/decryption and digital signatures.
        </Typography>
        <Typography color="text.secondary">
          Vulnerabilities
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">    
        <List>
          <ListItem>Side-channel attacks
            <ListItemText>These attacks exploit information gained from the physical implementation of the system, like power consumption or electromagnetic radiation. Two primary side-channel attacks against RSA are:

Power analysis attacks: Varying power consumption due to computationally intensive operations can reveal clues about the secret key.
Timing attacks: The time taken to perform encryption can potentially leak details about the encryption key.</ListItemText>
          </ListItem>
          <ListItem>Inadequate key length: As computational power increases, the length of RSA keys that were once considered safe becomes vulnerable. Today, a key length of at least 2048 bits is recommended for RSA.</ListItem>
          <ListItem>Weaknesses in prime numbers: Randomness: RSA relies on random prime numbers. If these are not truly random or if they follow a predictable pattern, then the security of the RSA key is compromised.
Closeness: If the two prime numbers used for generating RSA keys are too close in value or if one is too small, then the encryption is weakened, making it easier for attackers to determine the factors of the RSA modulus.</ListItem>
Lost or stolen keys: If RSA keys are lost, stolen, or otherwise compromised, the security of all encrypted data is at risk.

Fault-based attacks: These are attacks where errors are deliberately introduced into the system, either in the hardware or software, making the system produce incorrect outputs. This can potentially reveal details about the cryptographic keys or operations.
        </List>
         
         </Typography>
      </CardContent> 
    </Card>
  </>
)

const DSS = (
  <>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          RSA (Rivest-Shamir-Adleman)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
      </CardContent> 
    </Card>
  </>
)

const ECC = (
  <>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          RSA (Rivest-Shamir-Adleman)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
      </CardContent> 
    </Card>
  </>
)

const Diffie = (
  <>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          RSA (Rivest-Shamir-Adleman)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
      </CardContent> 
    </Card>
  </>
)

const TLS = (
  <>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          RSA (Rivest-Shamir-Adleman)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
        <Typography color="text.secondary">
          Mathematical Foundation
        </Typography>
        <Typography  sx={{ mb: 1 }} variant="body2">
          The security of RSA is primarily based on the difficulty of two mathematical problems: factoring large composite integers and the RSA problem (computing modular exponentiation without the private key)
        </Typography>
      </CardContent> 
    </Card>
  </>
)


export default function Examples() {
  return (<>
    {RSA}
    <div>

      <br /><br />
      DSS (Digital Signature Standard) & DSA (Digital Signature Algorithm):

      Mathematical Foundation: DSA's security is based on the discrete logarithm problem. It's harder to compute logarithms in a finite field than to perform exponentiation.
      Usage: As you've noted, DSA is solely for digital signatures. Unlike RSA, it cannot be used for encryption.
      Vulnerabilities: Like RSA, the key length needed for DSA has increased over time due to advances in computing. Additionally, secure parameter generation is crucial to ensure DSA's security.
      <br /><br />
      ECC (Elliptical Curve Cryptography):

      Mathematical Foundation: ECC's security is derived from the elliptic curve discrete logarithm problem. Basically, given a point
      �
      P and another point
      �
      Q, it's computationally difficult to find the integer
      �
      n such that
      �
      =
      �
      �
      Q=nP.
      Usage: ECC can be used in any public key application (encryption, digital signatures, key exchange). ECDSA and ECDH are two primary examples.
      Vulnerabilities: ECC is generally considered secure when well-implemented. However, not all elliptic curves are safe, so curve selection is essential.
      <br /><br />
      Diffie-Hellman Exchange:

      Mathematical Foundation: The security of the traditional Diffie-Hellman is based on the discrete logarithm problem in multiplicative groups of finite fields.
      Usage: Diffie-Hellman itself is not an encryption or signature scheme but a method to securely agree upon a secret over an insecure channel.
      Vulnerabilities: Like other discrete logarithm-based systems, its security could be threatened by quantum computers. The Logjam attack also demonstrated vulnerabilities in the implementation of Diffie-Hellman in some contexts.
      <br /><br />
      TLS/SSL (Transport Layer Security/Secure Sockets Layer):

      Mathematical Foundation: TLS/SSL uses a combination of asymmetric and symmetric encryption. The exact algorithms can vary depending on the protocol version and configuration.
      Usage: Beyond websites, it's used for encrypting other forms of communication like email (SMTPS, IMAPS), file transfers (FTPS), and VPNs.
      Vulnerabilities: There have been various vulnerabilities over the years, from Heartbleed to POODLE, emphasizing the need for continuous updates and phasing out older, insecure versions of the protocol.
    </div></>
  )
}
