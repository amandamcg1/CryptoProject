import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import createData from './createData';
import { Box, ThemeProvider, Typography } from '@mui/material';
import theme from '../Theme';
import styled from '@emotion/styled';

const rows = [
  createData('Public Key', 'A key that is shared with anyone and is used to encrypt data.'),
  createData('Private Key', 'A secret key that remains with the user and is used to decrypt data encrypted with the associated public key.'),
  createData('Key Pair', 'The combination of a public key and a private key.'),
  createData('Encryption', 'The process of converting plain text into ciphertext using a key.'),
  createData('Decryption', 'The process of converting ciphertext back to plain text using a key.'),
  createData('Digital Signature', "A cryptographic method used to validate the authenticity and integrity of a digital message or document. It acts as an electronic stamp, confirming that the information came from the known sender and hasn't been tampered with."),
  createData('Certificate Authority (CA)', 'A trusted third party that verifies the identity of entities and issues digital certificates.'),
  createData('Digital Certificate', 'An electronic document that uses a digital signature to bind together a public key with an identity.'),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Terminology() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ mt: 15, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '80%', mb: 5}}>
          <Typography 
            fontSize={40} 
            color='white' 
            mb={8} 
            textAlign='center'
            fontFamily='Titillium Web'
            letterSpacing='.5rem'
          >
            <Box
              sx={{ backgroundColor: 'primary.main', pt: 2, pb: 2, pl: 3, pr: 3,  display: 'inline-block', borderRadius: '5px' }}
            >
              TERMINOLOGY
            </Box>
          </Typography>
        
        <Typography fontSize={17} mb={2} sx={{ fontWeight: 700 }}>This is some of the terminology related to asymmetric cryptography</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Term</StyledTableCell>
                <StyledTableCell align="left">Meaning</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" > 
                    <strong>{row.name}</strong>
                  </TableCell>
                  <TableCell align="left">{row.def}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </ThemeProvider>
  );
}