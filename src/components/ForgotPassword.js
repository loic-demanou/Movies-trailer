import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Alert, Link, Typography } from '@mui/material';

export default function ForgotPassword({ setModalView }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage("Email de réinitialisation envoyé. Vérifiez votre boîte de réception.");
    } catch (error) {
      setError("Échec de l'envoi de l'email: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="forgot-password-container">
      <h2>Mot de passe oublié</h2>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button disabled={loading} type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 1 }}>
          Réinitialiser le mot de passe
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        <Link onClick={() => setModalView(0)} sx={{ cursor: 'pointer' }}> {/* setModalView(0) pour revenir à la connexion */} 
          Retour à la connexion
        </Link>
      </Typography>
       <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        Pas encore de compte?{" "}
        <Link onClick={() => setModalView(1)} sx={{ cursor: 'pointer' }}> {/* setModalView(1) pour aller à l'inscription */} 
          S'inscrire
        </Link>
      </Typography>
    </div>
  );
} 