import React, { useState } from 'react';
import { Modal, Box, Tabs, Tab, Typography } from '@mui/material';
import Login from './Login'; // Nous allons le modifier plus tard
import Signup from './Signup'; // Importer le composant Signup
import ForgotPassword from './ForgotPassword'; // Importer ForgotPassword
// import ForgotPassword from './ForgotPassword'; // Nous allons le créer

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: '450px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column'
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography component="div" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function AuthModal({ open, handleClose }) {
  const [value, setValue] = useState(0); // 0 for Login, 1 for Signup, 2 for Forgot Password

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={style}>
        {value === 2 ? (
          <ForgotPassword setModalView={setValue} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="auth tabs" variant="fullWidth">
                <Tab label="Se connecter" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                <Tab label="S'inscrire" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Login setModalView={setValue} closeModal={handleClose} /> {/* setModalView permettra de switcher vers Inscription ou Mot de passe oublié */}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Signup setModalView={setValue} closeModal={handleClose} /> {/* Utiliser le composant Signup ici */}
            </TabPanel>
            {/* On pourrait ajouter un TabPanel pour le mot de passe oublié si on ne le met pas directement dans Login */}
          </Box>
        )}
      </Box>
    </Modal>
  );
} 