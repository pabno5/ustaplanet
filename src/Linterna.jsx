import { useState, useEffect } from "react";
import "./Styles.css";
import ".././src/juegostiles.css";

import plata from "./../src/images/Plata.png";
import Volcan from "./../src/images/volcan.png";
import fondo from "./../src/images/fondo.jpg";
import { useNavigate } from 'react-router-dom';



const Linterna = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSelectableVisible, setIsSelectableVisible] = useState(false);
  const [revealPosition, setRevealPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  useEffect(() => {

    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      setRevealPosition({ x: x - 75, y: y - 75 });

      const seleccionable = document.querySelector(".seleccionable");
      if (seleccionable) {
        const seleccionableRect = seleccionable.getBoundingClientRect();
        const distanciaX = Math.abs(x - (seleccionableRect.left + seleccionableRect.width / 2));
        const distanciaY = Math.abs(y - (seleccionableRect.top + seleccionableRect.height / 2)-100);

        if (distanciaX < 75 && distanciaY < 75) {
          setIsSelectableVisible(true); // Iluminar la imagen
        } else {
          setIsSelectableVisible(false); // Ocultar la imagen
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleImageClick = () => {
    setIsSelectableVisible(false); // Ocultar la imagen después de seleccionarla
    setIsPopupVisible(true); // Mostrar el popup
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (

    <div >
  <h1 style={{ color: '#fff' }}>Arrastra el cursor e ilumina todo a tu paso hasta encontrar algo que solo puedes ver en las supertierras</h1>
    {/* Área de revelado */}
      <div className="overlay" id="overlay">
        <div
          className="reveal-area"
          style={{
            left: `${revealPosition.x}px`,
            top: `${revealPosition.y}px`,
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "transparent",
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.8)"
          }}
        ></div>
      </div>

      {/* Imagen seleccionable */}
      <img
        src={Volcan}   
        alt="Seleccionable"
        className="seleccionable"
        onClick={handleImageClick}

        style={{
           width: "14%",
          opacity: isSelectableVisible ? "1" : "0",
          transition: "opacity 0.3s ease"
        }}
      />

    
      {/* Popup */}
      {isPopupVisible && (
        <div id="popup" className="popup" style={{ display: "flex" }}>
          <div className="popup-content">
            <h2>¡Misión completada!</h2>
            <p>Has adivinado la palabra correctamente.</p>
            <img src={plata} alt="Logro desbloqueado" className="achievement-img" />
            <p className="achievement-text">Logro desbloqueado</p>
            <button onClick={() => navigate('/Seleccion')}>Continuar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Linterna;