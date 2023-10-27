import { 
  AppBar, 
  Container, 
  Toolbar, 
  Menu, 
  IconButton,
  Box,
  Button,
  MenuItem,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from 'react-router-dom';
import theme from '../Theme';

function Navigation () {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return(<>
  <ThemeProvider theme={theme}>
    <AppBar position="fixed" color='default'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/'>
                  Home
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/simulation'>
                  Simulation
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/chat'>
                  Chat
                </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                component={Link}
                to='/'
              >
                Home
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                component={Link}
                to='/simulation'
              >
                Simulation
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                component={Link}
                to='/chat'
              >
                Chat
              </Button>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  </ThemeProvider>
  </>)
}

export default Navigation;
