import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Unstable_Grid2';

export default function Uses() {
  return (
    <>
    <Typography>Some of the uses of asymmetric cryptography include:</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Secure Communication</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Asymmetric cryptography enables secure communication over public channels. The sender can encrypt a message with the recipient's public key, and only the recipient can decrypt it with their private key.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Digital Signatures</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              It ensures the integrity, non-repudiation, and authenticity of a message or document. A sender can use their private key to sign a document, and others can verify the signature using the sender's public key.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Key Exchange</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Protocols like Diffie-Hellman use asymmetric cryptography principles to securely exchange symmetric encryption keys over a public channel.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Identity Verification</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Digital certificates, which incorporate public keys, can be used to verify the identity of an entity.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Secure Websites (SSL/TLS)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              When you visit a website starting with "https", asymmetric cryptography is in use. The website's server sends its public key embedded in a digital certificate to your browser. Your browser may then use this to encrypt data sent to the server.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={6}>
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Multi-Factor Authentication (MFA)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Asymmetric cryptography can be used as one of the multiple factors in MFA, where a user must provide two or more verification methods to gain access to a resource. For instance, a user might be required to provide a password (something they know) and a digital signature generated with a private key from a hardware token or smart card (something they have) to authenticate themselves. 
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  </>
  )
}
