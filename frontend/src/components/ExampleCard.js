import { Card, CardContent, ThemeProvider, Typography } from "@mui/material";
import exampleTitle from "../style/exampleTitle";
import exampleSubtitle from "../style/exampleSubtitle";
import exampleBody from "../style/exampleBody";
import theme from "../Theme";

const card = ({info}) => {
  return (<>
  <ThemeProvider theme={theme}>
    <Card sx={{ border: '2px solid #C5CBE3', height: '100%'}}>
      <CardContent>
        <Typography sx={exampleTitle}>
          {info.name}
        </Typography>
        <Typography variant="subtitle1" sx={exampleSubtitle}>
          Mathematical Foundation
        </Typography>
        <Typography  variant="body2" sx={exampleBody}>
          {info.foundation}
        </Typography>
        <Typography variant="subtitle1" sx={exampleSubtitle}>
          Usage
        </Typography>
        <Typography variant="body2" sx={exampleBody}>
          {info.usage}
        </Typography>
        <Typography variant="subtitle1" sx={exampleSubtitle}>
          Vulnerabilities
        </Typography>
        <Typography variant="body2" sx={exampleBody}>  
          {info.vulnerabilities}
         </Typography>
      </CardContent> 
    </Card>
  </ThemeProvider>
</>)
}

export default card;