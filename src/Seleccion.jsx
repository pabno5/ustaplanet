import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './Styles.css';
import img1 from './../src/images/1.png';
import img2 from './../src/images/2.png';
import img3 from './../src/images/3.png';
import img4 from './../src/images/4.png';
import Sol from './../src/images/sol.png';
import Oro from "./../src/images/Oro.png";
import { useNavigate } from 'react-router-dom';

const planetsData = [
  { id: 'Mercurio', src: img1, alt: 'Mercurio' },
  { id: 'Venus', src: img2, alt: 'Venus' },
  { id: 'Marte', src: img3, alt: 'Marte' },
  { id: 'Tierra', src: img4, alt: 'Tierra' },
  { id: 'Sol', src: Sol, alt: 'Sol' },
];

const App = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Mover la definición de navigate aquí

  const checkAnswer = (selectedPlanet) => {
    const correctPlanet = 'Tierra';
    if (selectedPlanet === correctPlanet) {
      setOpen(true);
    } else {
      alert('¡Incorrecto! Intenta de nuevo.');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" style={{color:"#ffffff"}} gutterBottom>
          Elige un planeta
        </Typography>
        <Typography variant="subtitle1"  style={{color:"#ffffff"}}  gutterBottom>
          Elige el planeta más cercano al sol
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {planetsData.map((planet) => (
            <Grid item key={planet.id}>
              <Box textAlign="center">
                <img
                  src={planet.src}
                  alt={planet.alt}
                  className="planet"
                  onClick={() => checkAnswer(planet.id)}
                  style={{ cursor: 'pointer', width: '100px', height: '100px' }}
                />
                {planet.id === 'Sol' && (
                  <Typography variant="h6" style={{color:"#ffffff"}}  className="sun-label">
                    Sol
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¡Misión completada!</DialogTitle>
        <DialogContent>
          <Typography>Has encontrado el planeta correcto.</Typography>
          <img src={Oro} alt="Logro desbloqueado" className="achievement-img" />
          <Typography className="achievement-text">Logro desbloqueado</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/video3')} color="primary">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;