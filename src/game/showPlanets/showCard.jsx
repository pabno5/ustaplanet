import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import InfoPlanet from '.././showPlanets/planetInfo'; // Asegúrate de que la ruta y el nombre del archivo sean correctos
import data from '../../exoplanets_data_updated.json';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

const CardPlanets = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [open, setOpen] = useState(false);

  const handleCardClick = (planet) => {
    setSelectedPlanet(planet);
    setOpen(true);
  };

const handleClose = () => {
  setOpen(false);
};

  return (
    <>
      {Object.entries(data).map(([category, { definicion, planets }]) => (
        <div className='category' key={category}>
          <h2>{category}</h2>
          <p>{definicion}</p>
          <div className='planetCards'>
            {planets.map((planet) => (
              <ImgMediaCard
                key={planet.nombre} // Asegúrate de que 'nombre' sea único
                name={planet.nombre}
                img={planet.imagen}
                distanciaSol={planet.distancia_al_sol}
                edad={planet.edad}
                onClick={() => handleCardClick(planet)}
              />
            ))}
          </div>
        </div>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {selectedPlanet && <InfoPlanet planet={selectedPlanet} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

function ImgMediaCard({ name, img, distanciaSol, edad, onClick }) { 
  return (
    <div className="planet">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Distancia al Sol: {distanciaSol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Edad: {edad}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default CardPlanets;