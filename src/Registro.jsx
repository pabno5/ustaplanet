import React, { useState, useContext } from 'react'; // Importa React y el hook useState para manejar el estado del componente
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para manejar la navegación
import { TextField, Button, Container, Typography, Paper } from '@mui/material'; // Importa componentes de Material-UI
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios'; // Importa axios para manejar las solicitudes HTTP
import { LanguageContext } from './languageContext'; // Asegúrate de que esta ruta sea correcta

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

const Registro = () => {
  const { idioma } = useContext(LanguageContext);
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const [name, setName] = useState(''); // Estado para almacenar el nombre completo
  const [fecha, setFecha] = useState(''); // Estado para almacenar la fecha de nacimiento
  const navigate = useNavigate(); // Hook para navegación programática

  // Función que maneja el envío del formulario de registro
  const handleRegister = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const user = { nombre_completo_usuario: name, fecha_nac_usuario: fecha, correo: email, contrasenna: password, nombre_usuario: username }; // Crea un objeto de usuario con los datos del formulario

    try {
      // Enviar los datos del usuario al servidor
      const response = await axios.post('http://localhost:3000/usuarios', user);
      console.log('Usuario registrado:', response.data);
      // Navegar a la página de inicio de sesión después del registro exitoso
      navigate('/');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(/space-background.jpg)', backgroundSize: 'cover' }}> 
        {/* Contenedor con un fondo de imagen espacial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // El formulario aparece desde abajo
          animate={{ opacity: 1, y: 0 }} // Animación de desvanecimiento y desplazamiento hacia arriba
          transition={{ duration: 1 }} // Duración de la animación
        > 
          <Paper elevation={5} style={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper, backdropFilter: 'blur(10px)', boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.3)' }}> 
            {/* Fondo con un tono translúcido y un leve desenfoque */}
            <Typography variant="h4" align="center" gutterBottom style={{ color: theme.palette.text.primary, textShadow: '0px 0px 10px #FFFFFF' }}> 
              {/* Título con brillo de estrella */}
              {idioma === 'español' ? 'crea tu cuenta' : 'create your account'}
            </Typography>
            <form onSubmit={handleRegister}> {/* Formulario con función de manejo de envío */}
              <TextField
                label={idioma === 'español' ? 'Nombre completo' : 'full name'}
                variant="outlined" 
                fullWidth 
                type="text"
                margin="normal" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                InputProps={{
                  style: { color: theme.palette.text.primary }
                }}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                variant="outlined" 
                type="date" 
                fullWidth 
                margin="normal" 
                value={fecha} 
                onChange={(e) => setFecha(e.target.value)} 
                required 
                InputProps={{
                  style: { color: theme.palette.text.primary }
                }}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                label={idioma === 'español' ? 'correo' : 'email'}
                variant="outlined" 
                type="email" 
                fullWidth 
                margin="normal" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                InputProps={{
                  style: { color: theme.palette.text.primary }
                }}
                InputLabelProps={{
                  style: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                label={idioma === 'español' ? 'contraseña' : 'password'}
                variant="outlined" 
                type="password" 
                fullWidth 
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
              <TextField
                label={idioma === 'español' ? 'nombre de usuario' : 'username'}
                variant="outlined" 
                type="text" 
                fullWidth 
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
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', boxShadow: '0px 0px 10px #4A00E0' }}> {/* Botón con un resplandor espacial */}
                {idioma === 'español' ? 'Registrar' : 'Register'}
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default Registro;