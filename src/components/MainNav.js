// import * as React from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./Signature.css"
import BrushIcon from '@mui/icons-material/Brush';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  // Style minimal pour la couleur et la taille, sans casser l'empilement vertical
  const navigationStyle = {
    color: "white",
    '&.Mui-selected': {
      color: '#1976d2',
    },
    '& .MuiBottomNavigationAction-label': {
      fontSize: { xs: '0.75rem', sm: '0.85rem' },
    },
  };

  const signatureStyle = {
    fontFamily: 'Lobster, Patrick Hand, cursive',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '1px',
    color: 'white',
    pointerEvents: 'none',
    userSelect: 'none',
  };

  useEffect(() => {
    if(value === 0) history.push('/');
    else if(value === 1) history.push('/movies');
    else if(value === 2) history.push('/series');
    else if(value === 3) history.push('/search');
  }, [value, history])

  return (
    <Box sx={{ 
         width: "100%",
         position: "fixed",
         bottom: 0,
         backgroundColor: "#2d313a",
         zIndex: 100,
        }}>
      <BottomNavigation
        sx={{ 
          backgroundColor: "#2d313a",
          height: { xs: '60px', sm: '65px' },
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
          sx={navigationStyle}
          label="Tendances" 
          icon={<WhatshotIcon />} 
        />
        <BottomNavigationAction 
          sx={navigationStyle}
          label="Films" 
          icon={<MovieIcon />} 
        />
        <BottomNavigationAction 
          sx={navigationStyle}
          label="Séries" 
          icon={<TvIcon />} 
        />
        <BottomNavigationAction 
          sx={navigationStyle}
          label="Recherche" 
          icon={<SearchIcon />} 
        />
        <BottomNavigationAction
          sx={{
            '& .MuiBottomNavigationAction-label': signatureStyle,
          }}
          label="LD.9"
          icon={null}
          value={-1}
          disabled
        />
      </BottomNavigation>
    </Box>
  );
}
