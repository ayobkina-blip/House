-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-03-2026 a las 11:34:32
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `recuperacio`
--
CREATE DATABASE IF NOT EXISTS `recuperacio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `recuperacio`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Evo_precios_viv`
--

CREATE TABLE IF NOT EXISTS `Evo_precios_viv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_vivienda` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Precio` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Evo_precios_viv`
--

INSERT INTO `Evo_precios_viv` (`id`, `id_vivienda`, `Fecha`, `Precio`) VALUES
(1, 1, '2026-01-01', 300000),
(2, 1, '2026-02-01', 305000),
(3, 1, '2026-03-01', 310000),
(4, 1, '2025-12-01', 275000),
(5, 2, '2026-01-01', 450000),
(6, 2, '2026-02-01', 475000),
(7, 2, '2026-03-01', 480000),
(8, 2, '2025-01-01', 400000),
(9, 3, '2025-12-01', 200000),
(10, 3, '2026-01-01', 305000),
(11, 3, '2026-02-01', 209000),
(12, 3, '2026-03-01', 295000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `state` varchar(150) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `availableUnits` int(11) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `laundry` tinyint(1) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locations`
--

INSERT INTO `locations` (`id`, `name`, `city`, `state`, `photo`, `availableUnits`, `wifi`, `laundry`, `rating`) VALUES
(1, 'Acme Fresh Start Housing', 'Chicago', 'IL', 'bernard-hermant-CLKGGwIBTaY-unsplash.jpg', 4, 1, 1, 0),
(2, 'A113 Transitional Housing', 'Santa Monica', 'CA', 'brandon-griggs-wR11KBaB86U-unsplash.jpg', 0, 0, 1, 0),
(3, 'Warm Beds Housing Support', 'Juneau', 'AK', 'i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg', 1, 0, 0, 0),
(4, 'Homesteady Housing', 'Chicago', 'IL', 'ian-macdonald-W8z6aiwfi1E-unsplash.jpg', 1, 1, 0, 0),
(5, 'Happy Homes Group', 'Gary', 'IN', 'krzysztof-hepner-978RAXoXnH4-unsplash.jpg', 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Reparaciones`
--

CREATE TABLE IF NOT EXISTS `Reparaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_vivienda` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Precio` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Reparaciones`
--

INSERT INTO `Reparaciones` (`id`, `id_vivienda`, `Fecha`, `Precio`) VALUES
(1, 1, '2026-01-01', 3000),
(2, 1, '2026-02-01', 305),
(3, 1, '2026-03-01', 1310),
(4, 1, '2025-12-01', 2050),
(5, 2, '2026-01-01', 4500),
(6, 2, '2026-02-01', 1475),
(7, 2, '2026-03-01', 4800),
(8, 2, '2025-01-01', 2340),
(9, 3, '2025-12-01', 200),
(10, 3, '2026-01-01', 6305),
(11, 3, '2026-02-01', 4209),
(12, 3, '2026-03-01', 7295);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vecinos`
--

CREATE TABLE IF NOT EXISTS `vecinos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idlocation` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_VECINOS_LOCATIONS` (`idlocation`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vecinos`
--

INSERT INTO `vecinos` (`id`, `idlocation`, `nombre`, `apellido`, `email`) VALUES
(1, 1, 'Pepet', 'Perez', 'pepet@perez.es'),
(3, 1, 'Pepet1', 'Perez1', 'pepet1@perez.es'),
(4, 1, 'Pepet2', 'Perez2', 'pepet2@perez.es'),
(5, 2, 'Pepet3', 'Perez3', 'pepet3@perez.es'),
(6, 2, 'Pepet4', 'Perez4', 'pepet4@perez.es'),
(7, 3, 'Pepet5', 'Perez5', 'pepet5@perez.es'),
(8, 3, 'Pepet6', 'Perez6', 'pepet6@perez.es'),
(9, 4, 'Pepet7', 'Perez7', 'pepet7@perez.es'),
(10, 4, 'Pepet8', 'Perez8', 'pepet8@perez.es'),
(11, 4, 'Pepet9', 'Perez9', 'pepet9@perez.es'),
(12, 5, 'Pepet10', 'Perez10', 'pepet10@perez.es'),
(13, 1, 'cgcgffgf', 'ghghg', 'toni@aaa'),
(14, 2, 'pepito0000', 'perez', 'toni@aaa.es'),
(15, 2, 'juan', 'andres', 'aaa@bb.es'),
(16, 2, 'jose', 'jose', 'jose@d.es'),
(17, 2, 'jose', 'jose', 'jose@d.es');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
