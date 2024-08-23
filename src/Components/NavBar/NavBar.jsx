import { Box, Button, Divider, Drawer, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from '../../IsMobile/IsMobile';

export const NavBar = () => {
  const auth = localStorage.getItem('auth') || false;
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigation = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (path) => {
    navigation(path);
    handleMenuClose();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, padding: '20px', color: '#344767' }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
        <Box
          sx={{
            height: '60px',
            width: '60px',
            borderRadius: '100px',
            border: '1px solid #E4E4E4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{ height: '40px', width: '40px', borderRadius: '100px' }}
            src='https://cdn-icons-png.flaticon.com/512/2101/2101703.png'
          />
        </Box>

        <Box sx={{ marginLeft: '30px' }}>
          <Typography>Jaipur</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '30px' }}>
        <Box
          sx={{
            height: '60px',
            width: '60px',
            borderRadius: '100px',
            border: '1px solid #E4E4E4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{ height: '40px', width: '40px', borderRadius: '100px' }}
            src='https://cdn3.iconfinder.com/data/icons/world-cities-1/256/50-512.png'
          />
        </Box>

        <Box sx={{ marginLeft: '30px' }}>
          <Typography>Bangalore</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}>
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
        <Box
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'saturate(200%) blur(30px)',
            width: `${isMobile ? "100%":'66%'}`,
            borderRadius: '13px',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          <Box>
            <Typography
              style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Roboto,sans-serif', color: '#344767', cursor: 'pointer' }}
              onClick={() => handleClick('/')}
            >
              SankyFy.com
            </Typography>
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Typography
                style={{ fontSize: '14px', fontFamily: 'Roboto,sans-serif', color: '#344767', cursor: 'pointer' }}
                onClick={() => handleClick('/')}
              >
                Home
              </Typography>
              <Typography
                style={{marginLeft: '15px', fontSize: '14px', fontFamily: 'Roboto,sans-serif', color: '#344767', cursor: 'pointer' }}
                onClick={() => handleClick('/about-us')}
              >
                About us
              </Typography>
              <Typography
                style={{ marginLeft: '15px', fontSize: '14px', fontFamily: 'Roboto,sans-serif', color: '#344767', cursor: 'pointer' }}
                onClick={() => handleClick('/contact-us')}
              >
                Contact us
              </Typography>
              {auth ? (
                <LogoutIcon onClick={() => logout()} style={{ marginLeft: '15px', fontSize: '20px', cursor: 'pointer' }} />
              ) : (
                <Typography
                  style={{ marginLeft: '15px', fontSize: '14px', cursor: 'pointer' }}
                  onClick={() => handleClick('/login')}
                >
                  Login
                </Typography>
              )}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <IconButton onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => handleClick('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleClick('/about-us')}>About us</MenuItem>
                <MenuItem onClick={() => handleClick('/contact-us')}>Contact us</MenuItem>
                {auth ? (
                  <MenuItem onClick={logout}>
                    <LogoutIcon style={{ marginRight: '10px' }} /> Logout
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => handleClick('/login')}>Login</MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Box>
      </Box>
      <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
        {list('right')}
      </Drawer>
    </Box>
  );
};
