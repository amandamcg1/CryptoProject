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
  Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from 'react-router-dom';
import theme from '../Theme';

function Navigation () {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // const pages = ['Home', 'Terminology', 'Examples', 'Simulation', 'Chat'];

  const pages = [
    { page: 'Home', link: '/'},
    { page: 'Terminology', link: '/terminology'},
    { page: 'Examples', link: '/examples'},
    { page: 'Simulation', link: '/simulation'},
    { page: 'Chat', link: '/chat'},
  ]

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
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', lg: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ASYMMETRY IN SECURITY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem onClick={handleCloseNavMenu} component={Link} to={page.link}>
                  <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', lg: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ASYMMETRY IN SECURITY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'right' }}>
            {pages.map((page) => (
              <Button
                key={page.page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.link}
                sx={{ my: 2, color: 'black', display: 'block'}}
              >
                {page.page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>


    {/* <AppBar position="fixed" color='default'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { ...'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ASYMMETRY IN SECURITY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { sm: 'flex', md: 'none' } }}>
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
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { sm: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/'>
                  Home
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/terminology'>
                  Terminology
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/examples'>
                  Examples
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/simulation'>
                  Simulation
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to='/chat'>
                  Chat
                </MenuItem>
            </Menu>
          </Box>  
          <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { ...'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'black',
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              ASYMMETRY IN SECURITY
            </Typography>
          <Box sx={{ flexGrow: 1, display: { sm: 'none', md: 'flex', justifyContent: 'right' } }}>
          
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
                to='/terminology'
              >
                Terminology
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                component={Link}
                to='/examples'
              >
                Examples
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
    </AppBar> */}
  </ThemeProvider>
  </>)
}

export default Navigation;
