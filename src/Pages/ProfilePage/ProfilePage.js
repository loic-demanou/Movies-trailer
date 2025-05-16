import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Profile/Sidebar';
import UserInfo from '../../components/Profile/UserInfo';
import ProfileWishlist from '../../components/Profile/ProfileWishlist';
import { Redirect } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, loading } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState('profil'); // 'profil' ou 'favoris'

  if (loading) {
    return (
      <div className="loading-container-profile">
        <CircularProgress />
      </div>
    );
  }

  if (!currentUser && !loading) {
    return <Redirect to="/" />; // Rediriger si pas connecté après chargement
  }

  const renderContent = () => {
    switch (selectedMenu) {
      case 'profil':
        return <UserInfo />;
      case 'favoris':
        return <ProfileWishlist />;
      default:
        return <UserInfo />;
    }
  };

  return (
    <Container maxWidth="lg" className="profile-page-container">
      <Typography variant="h4" component="h1" className="profile-page-title" gutterBottom>
        Mon Espace
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} className="sidebar-paper">
            <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} className="content-paper">
            {renderContent()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage; 