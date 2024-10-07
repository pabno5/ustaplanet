-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2024 a las 05:55:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ustaplanet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_completo_usuario` varchar(200) NOT NULL,
  `fecha_nac_usuario` date NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasenna` varchar(100) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `id_exoplaneta` int(11) DEFAULT NULL,
  `id_logro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_completo_usuario`, `fecha_nac_usuario`, `correo`, `contrasenna`, `nombre_usuario`, `id_exoplaneta`, `id_logro`) VALUES
(1, 'pablo', '1991-01-01', 'pablo@.com', 'password123', 'pabno5', NULL, NULL),
(2, 'pedro', '1995-01-01', 'pedro@.com', 'padre', 'padre', NULL, NULL),
(3, 'pa', '1995-01-01', 'pa@.com', 'pa', 'pa', NULL, NULL),
(4, '23a', '1996-01-01', 'pa@.com', 'pa', 'pa', NULL, NULL),
(5, 'Hola', '2024-10-01', 'asdfa@asdas', 'asfaq', '123asd', NULL, NULL),
(6, 'PABLO', '2024-10-05', 'pablito@gmail.com', 'pablito', 'pablito', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
