import { Box, ThemeProvider, Typography } from "@mui/material";
import theme from "../Theme";
import Grid from '@mui/material/Unstable_Grid2';
import Terminology from "./Terminology";
import Uses from "./Uses";
import Examples from "./Examples";

function Home () {
  return(<>
  <ThemeProvider theme={theme} >
    <Box width='100%' height='720px' display='flex' justifyContent='center' mt={10}>
      <Grid container direction='row' alignItems='center' height='100%' width='80%' justifyContent='center' spacing={4}>
        <Grid item xs={12} md={6} lg={5} mr={{ md: 10 }}>
          <Typography 
            fontSize={35} 
            color='primary.main' 
            mb={2} 
            borderBottom='2px solid'
            textAlign={{ sm: 'center', md: 'left', lg: 'center'}}
          >
            Asymmetric Cryptography
          </Typography>
          <Typography textAlign="justify">
            Asymmetric cryptography is a method of encryption where two 
            different keys are used: a public key and a private key. The
            public key is used for encryption, while the private key is 
            used for decryption. Since the keys are different, even if someone
            has the public key, they cannot decrypt a message without the 
            corresponding private key.
          </Typography>
        </Grid>
        <Grid item xs md lg>
          <Uses/>
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
  </>)
}

export default Home;
