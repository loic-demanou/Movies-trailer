import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, Typography, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';
import { FaHeart, FaUserCircle } from 'react-icons/fa';

// Fonction pour obtenir les initiales (peut être partagée si utilisée ailleurs)
const getInitials = (name) => {
  if (!name) return '?';
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
};

const Sidebar = ({ selectedMenu, setSelectedMenu }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null; // Ou un placeholder si nécessaire
  }

  return (
    <Box className="sidebar-container">
      <Box className="sidebar-user-info">
        <Avatar 
          src={currentUser.photoURL || undefined}
          alt={currentUser.displayName || currentUser.email}
          sx={{ width: 80, height: 80, mb: 2, bgcolor: '#673ab7' }}
        >
          {!currentUser.photoURL && getInitials(currentUser.displayName || currentUser.email)}
        </Avatar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold'}}>
          {currentUser.displayName || currentUser.email}
        </Typography>
        <Typography variant="body2"  sx={{ color: '#cccc' }}>
          {currentUser.email}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List component="nav">
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMenu === 'profil'}
            onClick={() => setSelectedMenu('profil')}
            className={`sidebar-item ${selectedMenu === 'profil' ? 'selected' : ''}`}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <ListItemText primary="Profil" sx={{ paddingLeft: '10px' }} />
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <FaUserCircle color={selectedMenu === 'profil' ? 'primary' : 'action'} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedMenu === 'favoris'}
            onClick={() => setSelectedMenu('favoris')}
            className={`sidebar-item ${selectedMenu === 'favoris' ? 'selected' : ''}`}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <ListItemText primary="Mes Favoris" sx={{ paddingLeft: '10px' }} />
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <FaHeart color={selectedMenu === 'favoris' ? 'primary' : 'action'} />
              {/* <FavoriteIcon color={selectedMenu === 'favoris' ? 'primary' : 'action'} /> */}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar; 