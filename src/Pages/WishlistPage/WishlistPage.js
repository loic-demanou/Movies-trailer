import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SingleContent from '../../components/SingleContent/SingleContent';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import './WishlistPage.css';

const WishlistPage = () => {
  const { currentUser, wishlist, wishlistLoading } = useAuth();

  if (!currentUser) {
    return (
      <Container className="wishlist-container">
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mt: 4 }}>
          Veuillez vous connecter pour voir votre liste de favoris.
        </Typography>
      </Container>
    );
  }

  if (wishlistLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container className="wishlist-container">
      <Typography variant="h4" component="h1" className="pageTitle" gutterBottom>
        Ma Liste de Favoris
      </Typography>
      {wishlist.length === 0 ? (
        <Typography variant="subtitle1" align="center">
          Votre liste de favoris est vide.
        </Typography>
      ) : (
        <Grid container spacing={2} className="wishlist-content">
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id} className="wishlist-item">
              <SingleContent 
                id={item.id}
                poster={item.poster_path}
                title={item.title}
                date={item.release_date || item.first_air_date || 'N/A'} // Gérer les dates différentes pour films/séries
                media_type={item.type}
                vote_average={item.vote_average || 0} // Assurer une valeur pour vote_average
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishlistPage; 