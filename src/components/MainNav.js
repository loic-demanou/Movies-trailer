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

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const navigationStyle = {
    color: "white",
    minWidth: 'auto',
    padding: '6px 8px',
    '& .MuiBottomNavigationAction-label': {
      fontSize: '0.7rem',
      marginTop: '2px',
      color: "white",
      '&.Mui-selected': {
        color: "#1976d2",
      },
    },
    '& .MuiBottomNavigationAction-iconOnly': {
      marginBottom: '2px',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.3rem',
      marginBottom: '2px',
      color: "white",
    },
    '&.Mui-selected': {
      '& .MuiBottomNavigationAction-label': {
        fontSize: '0.7rem',
        color: "#1976d2",
      },
      '& .MuiSvgIcon-root': {
        color: "#1976d2",
      },
    },
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
          '& .MuiBottomNavigationAction-root': {
            minWidth: { xs: 'auto', sm: '80px' },
            padding: { xs: '6px 4px', sm: '6px 8px' },
            '& .MuiBottomNavigationAction-label': {
              fontSize: { xs: '0.65rem', sm: '0.75rem' },
            },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            },
          },
          '& .MuiBottomNavigationAction-root.Mui-selected': {
            color: '#1976d2',
          },
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
        <div className="signature">LD.9</div>
      </BottomNavigation>
    </Box>
  );
}
