import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/game.scss';
import '../css/cards.scss';
import CardPlanets from './showPlanets/showCard'; // Asegúrate de que ImgMediaCard esté en la ruta correcta
import Planets from './planets';
import PlanetCardWithPopup from './showPlanets/planetInfo';
import Button from '@mui/material/Button';

const setInvisible = () => {
  const bgIntroElement = document.getElementById('bg-intro');
  if (bgIntroElement) {
    bgIntroElement.style.visibility = 'collapse';
  } else {
    console.error('Element with ID "bg-intro" not found.');
  }
};

export const setVisible = () => {
  const bgIntroElement = document.getElementById('bg-intro');
  if (bgIntroElement) {
    bgIntroElement.style.visibility = 'visible';
  } else {
    console.error('Element with ID "bg-intro" not found.');
  }
};

function Game() {
  const navigate = useNavigate();

  const LinternaClicket = () => {
    navigate('/video2');
  };

  return (
    <div>
      <div className='bg-intro' id='bg-intro'>
        <div className='text'>
          <h1 className='titulo'>Descubre los Exoplanetas</h1>
          <h3 className='subtitulo'>Rumbo a lo Desconocido</h3>

          <p className='introTxt'>
            ¿Te has imaginado alguna vez cómo sería vivir en un planeta diferente? 
            Más allá de nuestro hogar, la Tierra, se extiende un vasto universo repleto de exoplanetas,
            mundos fascinantes que orbitan estrellas distantes. 
            Estos planetas presentan una increíble variedad de condiciones: 
            desde aquellos que arden a temperaturas extremas, hasta otros que podrían albergar agua 
            y, potencialmente, vida.
          </p>
          <div className='buttons'>
            <Button color="secondary" variant="outlined" size="medium" onClick={setInvisible}>Explorar</Button>
            <Button color="secondary" variant="outlined" size="medium" onClick={LinternaClicket}>Jugar</Button>
          </div>
        </div>
        <div className='cards'>
          <CardPlanets></CardPlanets>
        </div>
      </div>
      <PlanetCardWithPopup></PlanetCardWithPopup>
      <Planets></Planets>
    </div>
  );
}

export default Game;