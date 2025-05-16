import React from 'react';
import { Typography, Box, Paper, Grid, Avatar, Divider, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile } from 'firebase/auth'; // Pour mettre à jour le profil Firebase
import './UserInfo.css';

const UserInfo = () => {
  const { currentUser, wishlist, loading } = useAuth();
  const [displayName, setDisplayName] = React.useState(currentUser?.displayName || '');
  const [email, setEmail] = React.useState(currentUser?.email || '');
  // const [photoURL, setPhotoURL] = React.useState(currentUser?.photoURL || ''); // Pour la mise à jour de la photo, plus complexe (upload)
  const [editMode, setEditMode] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [updateMessage, setUpdateMessage] = React.useState({ type: '', text: '' });

  React.useEffect(() => {
    if (currentUser) {
        setDisplayName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  if (loading || !currentUser) {
    return <Typography>Chargement des informations du profil...</Typography>;
  }

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    setIsUpdating(true);
    setUpdateMessage({ type: '', text: '' });
    try {
      await updateProfile(currentUser, { 
        displayName: displayName 
        // photoURL: photoURL // La mise à jour de l'email et du mot de passe est plus sensible et se fait avec d'autres fonctions Firebase.
      });
      setUpdateMessage({ type: 'success', text: 'Profil mis à jour avec succès!' });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      setUpdateMessage({ type: 'error', text: `Erreur lors de la mise à jour: ${error.message}` });
    }
    setIsUpdating(false);
  };

  return (
    <Box className="user-info-container">
      <Typography variant="h5" component="h2" gutterBottom className="section-title">
        Informations du Profil
      </Typography>

      {updateMessage.text && <Alert severity={updateMessage.type} sx={{ mb: 2 }}>{updateMessage.text}</Alert>}

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4} md={3} sx={{ textAlign: 'center' }}>
          <Avatar 
            src={currentUser.photoURL || undefined}
            alt={currentUser.displayName || currentUser.email}
            sx={{ width: 120, height: 120, margin: 'auto', mb: 2, fontSize: '3rem' }}
          >
            {!currentUser.photoURL && (currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0))?.toUpperCase()}
          </Avatar>
           {/* <Button size="small">Changer photo</Button> // Implémentation future */}
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {editMode ? (
            <Box component="form" noValidate autoComplete="off">
                <TextField 
                    label="Nom d'affichage"
                    fullWidth 
                    margin="normal" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                />
                <TextField 
                    label="Email"
                    fullWidth 
                    margin="normal" 
                    value={email} 
                    disabled // L'email est généralement non modifiable directement ici pour la sécurité
                    helperText="L'email ne peut pas être modifié ici."
                />
                {/* On pourrait ajouter un champ pour photoURL si on gère l'upload */}
                <Box sx={{ mt: 2, textAlign: 'right'}}>
                    <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ mr: 1 }} disabled={isUpdating}>Annuler</Button>
                    <Button variant="contained" onClick={handleUpdateProfile} disabled={isUpdating}>
                        {isUpdating ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6"><strong>Nom:</strong> {currentUser.displayName || 'Non défini'}</Typography>
              <Typography variant="body1" sx={{ mb:1 }}><strong>Email:</strong> {currentUser.email}</Typography>
              <Typography variant="body2"  sx={{ mb: 2, color: '#cccc' }}>
                Membre depuis: {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
              </Typography>
              <Button variant="outlined" onClick={() => setEditMode(true)}>Modifier le profil</Button>
            </Box>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" component="h2" gutterBottom className="section-title">
        Activité
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} className="stat-card">
            <Typography variant="h6" sx={{ color: '#3f51b5'}}>{wishlist.length}</Typography>
            <Typography variant="body1">Films & Séries en favoris</Typography>
          </Paper>
        </Grid>
        {/* D'autres cartes de stats pourraient être ajoutées ici */}
      </Grid>
    </Box>
  );
};

export default UserInfo; 