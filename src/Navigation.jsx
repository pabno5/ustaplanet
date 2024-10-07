import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './login'; // Ensure this import matches the file name
import Registro from './Registro';
import Home from './Home';
import { LanguageProvider } from './languageContext';
import SolarSystem from './SolarSystem';
import Video from './video';
import Game from './game/game';
import Planets from './game/planets';
import Linterna from './Linterna';
import Seleccion from './seleccion';
import Video2 from './video2';
import Video3 from './video3';

const Navigation = () => {
  return (
    <LanguageProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SolarSystem" element={<SolarSystem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video" element={<Video />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/game" element={<Game />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/linterna" element={<Linterna />} />
          <Route path="/seleccion" element={<Seleccion />} />
          <Route path="/video2" element={<Video2 />} />
          <Route path="/video3" element={<Video3 />} />
          {/* Add more routes as needed */}
        </Routes>
      </>
    </LanguageProvider>
  );
};

export default Navigation;