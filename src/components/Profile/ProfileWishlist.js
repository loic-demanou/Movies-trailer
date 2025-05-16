import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SingleContent from '../SingleContent/SingleContent';
import { Typography, CircularProgress, Grid, Box } from '@mui/material';
import './ProfileWishlist.css'; // Un CSS dédié si besoin d'ajustements spécifiques

const ProfileWishlist = () => {
  const { wishlist, wishlistLoading } = useAuth(); // currentUser n'est pas nécessaire ici car ProfilePage le vérifie déjà
  // console.log(wishlist);

  if (wishlistLoading) {
    return (
      <Box className="profile-wishlist-loading">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="profile-wishlist-container">
      <Typography variant="h5" component="h2" gutterBottom className="section-title-profilewishlist">
        Mes Films et Séries Favoris
      </Typography>
      {wishlist.length === 0 ? (
        <Typography variant="subtitle1" align="center" sx={{ mt: 3}}>
          Votre liste de favoris est actuellement vide. Commencez à explorer et ajoutez des titres !
        </Typography>
      ) : (
        <Grid container spacing={2} className="profile-wishlist-grid">
          {wishlist.map((item) => ( 
            <Grid item xs={12} sm={12} md={6} lg={4} key={item.id} className="profile-wishlist-item">
              <SingleContent 
                id={item.id}
                poster={item.poster}
                title={item.title || item.name}
                date={item.date || 'N/A'}
                media_type={item.type}
                vote_average={item.vote_average || 0}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProfileWishlist; 