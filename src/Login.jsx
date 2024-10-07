import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material';
import { LanguageContext } from "./languageContext";

// Tema personalizado con un estilo espacial
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

const Login = () => {
  const { idioma } = useContext(LanguageContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Función que maneja el envío del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { username, password };

    try {
      const response = await axios.post('http://localhost:3000/login', user);
      console.log('Login exitoso:', response.data);
      // Redireccionar al registro si el login es exitoso
      navigate('/video');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
    }
  };

  const handleRegister = async (e) => {
    navigate('/registro');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(/space-background.jpg)', backgroundSize: 'cover' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Paper elevation={5} style={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper, backdropFilter: 'blur(10px)', boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.3)' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ color: theme.palette.text.primary, textShadow: '0px 0px 10px #FFFFFF' }}>
              {idioma === 'español' ? 'Iniciar sesión' : 'Login'}
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label={idioma === 'español' ? 'Nombre de usuario' : 'Username'}
                variant="outlined"
                fullWidth
                type="text"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  style: { color: theme.palette.text.primary }
                }}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                label={idioma === 'español' ? 'Contraseña' : 'Password'}
                variant="outlined"
                fullWidth
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  style: { color: theme.palette.text.primary }
                }}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary }
                }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', boxShadow: '0px 0px 10px #4A00E0' }}>
                {idioma === 'español' ? 'Iniciar sesión' : 'Login'}
              </Button>
              <Button onClick={handleRegister} variant="contained" color="primary" fullWidth style={{ marginTop: '20px', boxShadow: '0px 0px 10px #4A00E0' }}>
                {idioma === 'español' ? 'Registrar' : 'Register'}
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default Login;