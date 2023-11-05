import { Typography,  Box, Accordion, AccordionSummary, AccordionDetails, ThemeProvider } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ExampleCard from './ExampleCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../Theme';

const rsatable = (
  <>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Inadequate key length</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        As computational power increases, the length of RSA keys that were once considered safe becomes vulnerable. Today, a key length of at least 2048 bits is recommended for RSA.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Weaknesses in prime numbers</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        <strong>Randomness:</strong> RSA relies on random prime numbers. If these are not truly random or if they follow a predictable pattern, then the security of the RSA key is compromised. <br/> <strong>Closeness:</strong> If the two prime numbers used for generating RSA keys are too close in value or if one is too small, then the encryption is weakened, making it easier for attackers to determine the factors of the RSA modulus.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Side-channel attacks</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        These attacks exploit information gained from the physical implementation of the system, like power consumption or electromagnetic radiation. Two primary side-channel attacks against RSA are: <br/><strong>Power analysis attacks:</strong> Varying power consumption due to computationally intensive operations can reveal clues about the secret key. <br/><strong>Timing attacks:</strong> The time taken to perform encryption can potentially leak details about the encryption key.
      </Typography>
    </AccordionDetails>
  </Accordion>
  </>
)
const rsainfo = { 
  name: 'RSA (Rivest-Shamir-Adleman)', 
  foundation: "RSA is based on the mathematical properties of large prime numbers. The algorithm relies on the fact that it is computationally difficult to factor a large composite number into its prime factors. It uses modular arithmetic and the Euler's totient function to generate public and private keys.", 
  usage: "RSA is widely used for secure data transmission, digital signatures, and secure key exchange. It is a fundamental part of secure communication on the internet, and it is used in protocols like HTTPS, SSH, and S/MIME for email security.", 
  vulnerabilities: rsatable
}

const DSStable = (
  <>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Weak Key Generation</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        If the key generation process is flawed or the random number generator used to create keys is not truly random, it can result in weak keys that are susceptible to attacks.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Cryptanalysis</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        DSA relies on the difficulty of solving the discrete logarithm problem. Advances in cryptanalysis and the use of faster computers can weaken the security of DSA over time.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Side-channel attacks</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Side-channel attacks, such as timing attacks or power analysis, can potentially leak information about the private key during the signing process if not properly protected.
      </Typography>
    </AccordionDetails>
  </Accordion>
  </>
)
const DSSinfo = { 
  name: 'DSS (Digital Signature Standard) & DSA (Digital Signature Algorithm)', 
  foundation: 'DSS and DSA are based on the mathematical foundation of the Digital Signature Algorithm, which relies on the properties of modular exponentiation and the discrete logarithm problem. Specifically, it uses the difficulty of computing the discrete logarithm of a random elliptic curve element with respect to a known base point.', 
  usage: 'DSS and DSA are used for digital signatures. They provide a way to verify the authenticity and integrity of a digital message or document. These digital signatures are widely used in applications like email, software distribution, and secure communications.', 
  vulnerabilities: DSStable
}

const ecctable = (
  <>   
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Weak Curve Parameters</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        The security of ECC relies on the choice of elliptic curve parameters. If weak or poorly chosen curve parameters are used, it can weaken the overall security of the system.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Quantum Computing</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        ECC is vulnerable to Shor's algorithm, which could be used by sufficiently advanced quantum computers to efficiently solve the discrete logarithm problem, potentially compromising ECC security.
      </Typography>
    </AccordionDetails>
  </Accordion>
  </>
)
const eccinfo = {
  name: "ECC (Elliptic Curve Cryptography)",
  foundation: 'ECC is based on the mathematical properties of elliptic curves over finite fields. It leverages the difficulty of solving the elliptic curve discrete logarithm problem (ECDLP). ECC provides strong security with relatively short key sizes compared to other asymmetric cryptographic algorithms.',
  usage: "ECC is commonly used in applications where computational resources are limited, such as mobile devices and IoT devices. It's also used in secure communications, digital signatures, and encryption.",
  vulnerabilities: ecctable
}

const diffietable = (
  <>  
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Man-in-the-Middle (MitM) Attacks</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Without proper authentication and key management, the Diffie-Hellman key exchange is vulnerable to MitM attacks, where an attacker intercepts and modifies the exchanged keys.
      </Typography>
    </AccordionDetails>
  </Accordion>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Weak Parameters</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        The security of Diffie-Hellman depends on the choice of prime numbers and generator values. If these parameters are poorly chosen, it can weaken the security of the key exchange.
      </Typography>
    </AccordionDetails>
  </Accordion>
  </>
)
const diffieinfo = {
  name: "Diffie-Hellman Exchange",
  foundation: 'Diffie-Hellman is based on the mathematical concept of discrete logarithm. It allows two parties to establish a shared secret over an insecure channel without exchanging the secret itself. The security of Diffie-Hellman relies on the difficulty of computing discrete logarithms in a finite field.',
  usage: 'RSA is widely used for secure data transmission, digital signatures, and secure key exchange. It is a fundamental part of secure communication on the internet, and it is used in protocols like HTTPS, SSH, and S/MIME for email security.',
  vulnerabilities: diffietable
}


export default function Examples() {
  return (<>
  <ThemeProvider theme={theme}>
    <Box sx={{ mt: 15, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '85%', mb: 5}}>
        <Typography 
            fontSize={40} 
            color='primary.main' 
            mb={2} 
            textAlign={{ sm: 'center', md: 'left', lg: 'center'}}
          >
            Examples
          </Typography>
          <Typography fontSize={17} mb={2} sx={{ fontWeight: 700 }}>These are some examples of asymmetric cryptography:</Typography>
        <Grid 
          container 
          spacing={2} 
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item sm={12} md={6} xl={3}><ExampleCard info={rsainfo} /></Grid>
          <Grid item sm={12} md={6} xl={3}><ExampleCard info={DSSinfo} /></Grid>
          <Grid item sm={12} md={6} xl={3}><ExampleCard info={diffieinfo} /></Grid>
          <Grid item sm={12} md={6} xl={3}><ExampleCard info={eccinfo} /></Grid>
          </Grid>
      </Box>
    </Box>
  </ThemeProvider>
  </>
  )
}
