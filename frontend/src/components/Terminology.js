import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, def) {
  return { name, def };
}

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

export default function Terminology() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Term</TableCell>
            <TableCell align="left">Meaning</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.def}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}