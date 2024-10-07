import React from 'react';

const InfoPlanet = ({ planet }) => {
  if (!planet) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={planet.imagen} alt={planet.nombre} style={{ width: '300px', marginRight: '20px' }} />
      <div>
        <h2>{planet.nombre}</h2>
        <p><strong>Distancia al Sol:</strong> {planet.distancia_al_sol}</p>
        <p><strong>Edad:</strong> {planet.edad}</p>
        <p><strong>Fecha de Descubrimiento:</strong> {planet.fecha_descubrimiento}</p>
        <p><strong>Ejemplo:</strong> {planet.ejemplo}</p>
      </div>
    </div>
  );
};

export default InfoPlanet;