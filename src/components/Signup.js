import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Alert, Link, Typography } from '@mui/material';

export default function Signup({ setModalView, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Pour les messages de succès (ex: email de vérification envoyé)
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Les mots de passe ne correspondent pas.");
    }

    try {
      setError('');
      setMessage('');
      setLoading(true);
      await signup(email, password);
      // L'utilisateur est maintenant créé et connecté par défaut par Firebase
      // Un email de vérification est envoyé automatiquement si configuré dans Firebase
      setMessage("Compte créé avec succès ! Un email de vérification a été envoyé (si applicable).");
      // On pourrait fermer la modale après un délai ou laisser l'utilisateur le faire
      // closeModal(); 
    } catch (error) {
      setError("Échec de la création du compte: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
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
        <TextField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmer le mot de passe"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button disabled={loading} type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 1 }}>
          S'inscrire
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Déjà un compte?{" "}
        <Link href="#" onClick={() => setModalView(0)} sx={{ cursor: 'pointer' }}>
          Se connecter
        </Link>
      </Typography>
    </div>
  );
} 