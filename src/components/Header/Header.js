import React, { useState } from 'react';
import { useHistory  } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../contexts/AuthContext'; // Ajuster le chemin si nécessaire
import AuthModal from '../AuthModal'; // Ajuster le chemin si nécessaire
import Button from '@mui/material/Button'; // Pour un style cohérent
import Avatar from '@mui/material/Avatar'; // Importer Avatar
import Typography from '@mui/material/Typography'; // Pour le nom d'utilisateur

// Fonction pour obtenir les initiales
const getInitials = (name) => {
  if (!name) return '?';
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
};

const Header = () => {
    const { currentUser, logout } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const history = useHistory();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleLogout = async () => {
        try {
            await logout();
            history.push('/');
            // Gérer la déconnexion réussie si nécessaire (par exemple, redirection)
        } catch (error) {
            console.error("Failed to log out", error);
            // Gérer l'échec de la déconnexion
        }
    };

    return (
        <>
            <div className="header">
                <div onClick={scrollToTop} className="header-title-container">
                    <span className="header-icon">📺</span>
                    <span className="header-title">Movies Trailer</span>
                    <span className="header-icon">🎬</span>
                </div>
                <div className="auth-section">
                    {currentUser ? (
                        <>
                            <Avatar 
                                src={currentUser.photoURL || undefined} 
                                alt={currentUser.displayName || currentUser.email}
                                sx={{ width: 40, height: 40, marginRight: '10px', bgcolor: '#673ab7' /* Couleur de fond si pas d'image */ }}
                            >
                                {!currentUser.photoURL && getInitials(currentUser.displayName || currentUser.email)}
                            </Avatar>
                            <Typography variant="subtitle1" sx={{ color: 'white', marginRight: '15px', display: { xs: 'none', sm: 'block' } }}>
                                {currentUser.displayName || currentUser.email}
                            </Typography>
                            <Button 
                                variant="contained"
                                onClick={handleLogout}
                                className="logout-button"
                            >
                                Déconnexion
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={handleOpenModal} className="login-button">
                            Connexion
                        </Button>
                    )}
                </div>
            </div>
            <AuthModal open={openModal} handleClose={handleCloseModal} />
        </>
    );
}

export default Header;