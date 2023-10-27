import { Box, ThemeProvider, Typography } from "@mui/material";
import theme from "../Theme";
import Grid from '@mui/material/Unstable_Grid2';
import Terminology from "./Terminology";
import Uses from "./Uses";
import Examples from "./Examples";

function Home () {
  return(<>
  <ThemeProvider theme={theme}>
    <Box width='100%'>
      <Box sx={{ height: '150px', backgroundColor: 'primary.main', borderRadius: '0 0 15px 15px', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" color='white'>Asymmetric Cryptography</Typography>
      </Box>

      <Box width='90%' m='auto' mt={2}>
        <Box mt='15px' mb='15px' p='10px'>
          <Typography>
            Asymmetric cryptography is a method of encryption where two different keys
            are used: a public key and a private key. The public key is used for 
            encryption, while the private key is used for decryption. Since the keys 
            are different, even if someone has the public key, they cannot decrypt a 
            message without the corresponding private key.
          </Typography>
        </Box>

        <Typography variant="h5">Terminology</Typography>
          <Terminology/>
        <Typography variant="h5">Uses</Typography>
        <Uses/>
        <Typography variant="h5">Examples</Typography>
          <Examples/>
      </Box>
      


    </Box>
  </ThemeProvider>
  </>)
}

export default Home;
