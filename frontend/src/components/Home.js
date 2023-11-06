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
              fontSize={{ xs: 40, sm: 45, md: 30, lg: 50, xl: 55}} 
              color='white' 
              mb={2} 
              textAlign='center'
              fontFamily='Titillium Web'
              letterSpacing='.5rem'
            >
              <Box
                sx={{ backgroundColor: 'primary.main', pt: 2, pb: 2, pl: 3, pr: 3,  display: 'inline-block', borderRadius: '5px' }}
              >
                ASYMMETRIC CRYPTOGRAPHY
              </Box>
            </Typography>
            <Typography textAlign="justify" p={1}>
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
