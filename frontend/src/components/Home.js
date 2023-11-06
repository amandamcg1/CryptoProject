import { Box, ThemeProvider, Typography } from "@mui/material";
import theme from "../Theme";
import Grid from '@mui/material/Unstable_Grid2';
import Uses from "./Uses";

function Home () {
  return(<>
  <ThemeProvider theme={theme} >
    <Box width='100%' height='80vh' display='flex' justifyContent='center' mt={15}>
      <Grid container direction='row' alignItems='center' height='100%' width='80%' justifyContent='center' spacing={4}>
        <Grid item xs={12} md={6} lg={6} mr={{ lg: 10, }}>
          <Box>
            <Typography 
              fontSize={48} 
              color='primary.main' 
              mb={2} 
              borderBottom='2px solid'
              textAlign={{ xs: 'center', md: 'left', lg: 'center'}}
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
          </Box>
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
