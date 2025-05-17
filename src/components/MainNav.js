// import * as React from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
// import MovieIcon from '@mui/icons-material/Movie';
// import SearchIcon from '@mui/icons-material/Search';
// import TvIcon from '@mui/icons-material/Tv';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./Signature.css"
import { FaSearch } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { FaTv } from 'react-icons/fa';
import { FaFireAlt } from 'react-icons/fa';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  // Style minimal pour la couleur et la taille, sans casser l'empilement vertical
  const navigationStyle = {
    color: "white",
    '&.Mui-selected': {
      color: '#1976d2',
    },
    '&.icon-menu': {
      color: '#1976d2',
    },
    '& .MuiBottomNavigationAction-label': {
      fontSize: { xs: '0.75rem', sm: '0.85rem' },
      marginTop: '5px',
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
         color: 'white',
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
          icon={<FaFireAlt size={23} className="icon-menu" />} 
        />
        <BottomNavigationAction 
          sx={navigationStyle}
          label="Films" 
          icon={<MdMovie size={23} className="icon-menu" />} 
        />
        <BottomNavigationAction 
          sx={navigationStyle}
          label="Séries" 
          icon={<FaTv size={23} className="icon-menu" />} 
        />
        <BottomNavigationAction 
          sx={navigationStyle}
          label="Recherche" 
          icon={<FaSearch size={23} className="icon-menu" />} 
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
