import { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './Logo_ustaplanet.png'; 
import { ThemeProvider, createTheme } from '@mui/material';
import './header.css';
import español from './../src/images/icono-idioma-espanol.png';
import ingles from './../src/images/ingles.png';
import { LanguageContext } from './languageContext';

const opciones = [
  { label: 'español', image: español },
  { label: 'ingles', image: ingles },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A00E0',  // Un tono púrpura espacial
    },
    secondary: {
      main: '#8E2DE2',  // Color secundario, más vibrante como una nebulosa
    },
    background: {
      default: '#0D0D2B', // Color oscuro, como el espacio profundo
      paper: '#1B1B38',   // Fondo de los elementos como papel con un tono más claro
    },
    text: {
      primary: '#FFFFFF', // Texto en blanco, como estrellas
      secondary: '#B0A8B9' // Texto en tonos grises para el contraste
    }
  },
  typography: {
    fontFamily: "'Space Mono', monospace", // Fuente con un toque futurista
  },
});

const Header = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(opciones[0]);
  const { idioma, changeLanguage } = useContext(LanguageContext);

  const handleIdiomaDashboard = (event, newValue) => {
    if (newValue) {
      setValue(newValue);
      changeLanguage(newValue.label);
    }
  };

  const handleDashboard = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleLookClick = () => {
    navigate('/SolarSystem');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
        position="static" 
        style={{
          background: 'linear-gradient(45deg, #1c1f4a, #2b0033)', // Degradado espacial
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="logo" onClick={handleDashboard}>
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                width: '100px', // Tamaño ajustado
                height: '50px', // Tamaño ajustado
                borderRadius: '8px', // Bordes redondeados
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)', // Brillo suave alrededor del borde
              }} 
            />
          </IconButton>
          <Button
            onClick={() => navigate('/')}
            className='button'
            style={{ margin: '0 20px' }}
          >
            <Typography variant="h6" style={{ textShadow: '0px 0px 10px #FFFFFF', color: '#FFFFFF' }}>
              Usta Planet
            </Typography>
          </Button>
          <Button
            onClick={() => navigate('/')}
            className='button'
            style={{ margin: '0 20px' }}
          >
            <Typography variant="h6" style={{ textShadow: '0px 0px 10px #FFFFFF', color: '#FFFFFF' }}>
              {idioma === 'español' ? 'Inicio' : 'Home'}
            </Typography>
          </Button>
          <Button
            onClick={handleLogin}
            className='button'
            style={{ margin: '0 20px' }}
          >
            <Typography variant="h6" style={{ textShadow: '0px 0px 10px #FFFFFF', color: '#FFFFFF' }}>
              {idioma === 'español' ? 'Iniciar sesión' : 'Login'}
            </Typography>
          </Button>
          <Button
            onClick={() => navigate('/')}
            className='button'
            style={{ margin: '0 20px' }}
          >
            <Typography variant="h6" style={{ textShadow: '0px 0px 10px #FFFFFF', color: '#FFFFFF' }}>
              {idioma === 'español' ? 'Acerca de' : 'About'}
            </Typography>
          </Button>
          <Autocomplete
            options={opciones}
            getOptionLabel={(option) => option.label} // Maneja opciones vacías
            value={value}
            onChange={handleIdiomaDashboard}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <li key={option.label} {...otherProps} style={{ display: 'flex', alignItems: 'center'}}>
                  <img src={option.image} alt={option.label} style={{ width: '10px', height: '10px', marginRight: '5px' }} />
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label={idioma === 'español' ? 'Selecciona un idioma' : 'Select a language'} variant="outlined" />
            )}
            style={{ margin: '0 20px' }}
          />
          <Button 
            variant="contained"
            color="primary"
            onClick={handleLookClick}
            className="look-button"
            style={{ margin: '0 20px' }}
          >
            {idioma === 'español' ? 'Ver' : 'Look'}
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={handleDashboard}
            className="look-button"
            style={{ margin: '0 20px' }}
          >
            {idioma === 'español' ? 'Volver' : 'Back'}
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;