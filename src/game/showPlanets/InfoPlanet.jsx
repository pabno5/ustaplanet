import '../css/game.scss';
import '../css/cards.scss';
import CardPlanets from './showPlanets/showCard';
import Planets from './planets';
import InfoPlanet from './showPlanets/InfoPlanet'; // Asegúrate de que la ruta y el nombre del archivo sean correctos

export default Game;

function Game() {
  return (
    <div>
      <div className='bg-intro'>
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
        </div>
        <div className='cards'>
          <CardPlanets></CardPlanets>
        </div>
      </div>
      <InfoPlanet></InfoPlanet>
    </div>
  );
}