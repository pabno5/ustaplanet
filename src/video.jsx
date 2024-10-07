import React, { useContext } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "./languageContext";
import explicacionEn from './videos/explicacion-en.mp4';
import explicacionEs from './videos/explicacion-es.mp4';
import Game from "./game/game";

const Video = () => {
    const { idioma } = useContext(LanguageContext);
    const navigate = useNavigate();
  
    return (
      <Container
        component="main"
        maxWidth={false}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          paddingTop: '64px', // Ajusta esto según la altura de tu header
        }}
      >
        <Button onClick={() => navigate('/game')} className="button" style={{ marginBottom: '20px' }}>
          <Typography variant="button" style={{ textShadow: '0px 0px 10px #FFFFFF', color: '#FFFFFF' }}>
            {idioma === 'español' ? 'Explora' : 'Explore'} {/* Texto que cambia según el idioma */}
          </Typography>
        </Button>
        <video width="100%" height="100%" controls autoPlay style={{ objectFit: 'cover' }}>
          <source src={idioma === 'español' ? explicacionEs : explicacionEn} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Container>
    );
  };
  
export default Video;