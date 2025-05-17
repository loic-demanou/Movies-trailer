import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Alert, Link, Typography, Divider } from '@mui/material';

export default function Login({ setModalView, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      closeModal();
    } catch (error) {
      setError("Échec de la connexion: " + error.message);
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      closeModal();
    } catch (error) {
      setError("Échec de la connexion avec Google: " + error.message);
    }
    setLoading(false);
  }

//   async function handleFacebookLogin() {
//     try {
//       setError('');
//       setLoading(true);
//       await loginWithFacebook();
//       closeModal();
//     } catch (error) {
//       setError("Échec de la connexion avec Facebook: " + error.message);
//     }
//     setLoading(false);
//   }

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
        <TextField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button disabled={loading} type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 1 }}>
          Se connecter
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 1, mb: 1 }}>
          <Link onClick={() => setModalView(2)} sx={{ cursor: 'pointer' }}>
            Mot de passe oublié?
          </Link>
        </Typography>
      </form>
      <Divider sx={{ my: 2 }}>OU</Divider>
      <Button onClick={handleGoogleLogin} disabled={loading} variant="outlined" fullWidth sx={{ mb: 1 }}>
        Se connecter avec Google
      </Button>
      {/* <Button onClick={handleFacebookLogin} disabled={loading} variant="outlined" fullWidth color="primary">
        Se connecter avec Facebook
      </Button> */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Pas encore de compte?{" "}
        <Link onClick={() => setModalView(1)} sx={{ cursor: 'pointer' }}>
          S'inscrire
        </Link>
      </Typography>
    </div>
  );
} 