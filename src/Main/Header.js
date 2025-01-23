import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  FormControl,
  Select,
  Chip
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null); // State for the menu anchor element
  const [drawerOpen, setDrawerOpen] = useState(false); // State for the drawer open/close
  const currentTime = new Date().toLocaleTimeString();
  const appBarDarkerColor = '#001a33'; // Slightly darker color

  // Handle menu open
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.setItem('cred_player', '{}');
    props.setCredentials({});
    props.setPage('home');
  };

  // Handle drawer open/close
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const translations = {
    English: {
      live: 'Live',
      movies: 'Movies',
      tvSeries: 'TV Series',
    },
    Spanish: {
      live: 'En Vivo',
      movies: 'Películas',
      tvSeries: 'Series de TV',
    },
    French: {
      live: 'En Direct',
      movies: 'Films',
      tvSeries: 'Séries TV',
    },
    // Add other languages as needed
  };
  const menuItems = [
    { text: translations[props.language]?.live, icon: <LiveTvIcon />, onClick: () => props.setPage('Live') },
    { text: translations[props.language]?.movies, icon: <MovieIcon />, onClick: () => props.setPage('Movie') },
    { text: translations[props.language]?.tvSeries, icon: <TvIcon />, onClick: () => props.setPage('Serie') },
  ];

  // Handle language change
  const handleLanguageChange = (event) => {
    props.setLanguage(event.target.value);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: appBarDarkerColor }}>
        <Toolbar>
          {props.credentials && Object.entries(props.credentials).length !== 0 && (
          <IconButton style={{ color: 'white' }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>)
          }
          <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer', color: 'white' }} onClick={() => props.credentials?props.setPage('dashboard') :props.setPage('home')}>
            LatinoDigital Player PRO
          </Typography>
          <FormControl variant='standard' style={{marginRight:50}} >
            <Select
              value={props.language}
              onChange={handleLanguageChange}
              renderValue={(selected) => <Chip label={selected} />}
              sx={{
                backgroundColor:'white',
                borderRadius:1
              }}
            >
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="French">French</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="subtitle1" style={{ marginRight: 20, color: 'white' }}>
            {currentTime ? currentTime : ''}
          </Typography>
          {props.credentials && Object.entries(props.credentials).length !== 0 && (
            <IconButton style={{ color: 'white' }} onClick={handleMenuClick}>
              <AccountCircle />
            </IconButton>
          )}
          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            style={{ cursor: 'pointer' }}
          >
            <MenuItem onClick={handleLogout}>{props.language === 'Spanish'? 'Cerrar sesión' : props.language === 'English'? 'Logout' : 'Déconnexion' }</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer for the side menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: 250 }}>
          <Typography variant="h6" style={{ padding: 16 }}>
            Menu
          </Typography>
          <Divider />
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  style={{ cursor: 'pointer' }}
                  button
                  onClick={() => {
                    item.onClick();
                    toggleDrawer(false)();
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
