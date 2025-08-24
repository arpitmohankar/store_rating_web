// src/components/common/Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Menu, MenuItem, Avatar, Box, Chip
} from '@mui/material';
import { AccountCircle, Logout, Password } from '@mui/icons-material';
import { toast } from 'react-toastify';

function Header({ title }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
    handleClose();
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'error';
      case 'store_owner': return 'warning';
      case 'user': return 'success';
      default: return 'default';
    }
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case 'admin': return 'Administrator';
      case 'store_owner': return 'Store Owner';
      case 'user': return 'User';
      default: return role;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title || 'Store Rating Platform'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label={getRoleLabel(user.role)} 
            color={getRoleColor(user.role)}
            variant="filled"
            size="small"
          />
          
          <Typography variant="body1">
            {user.name}
          </Typography>
          
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleChangePassword}>
              <Password sx={{ mr: 1 }} /> Change Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
