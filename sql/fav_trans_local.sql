-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-08-2024 a las 16:29:21
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_bibleqt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fav_trans`
--

CREATE TABLE `fav_trans` (
  `id_fav_trans` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `arrFavTrans` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fav_trans`
--

INSERT INTO `fav_trans` (`id_fav_trans`, `id_user`, `username`, `arrFavTrans`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[\"rstStrongRed\",    \"rstt\",    \"rsti2\",    \"rstm\",    \"abi\",  \"nrt\",  \"mdri\",    \"rsp\",    \"opnz\",    \"ukr_fil\",    \"ukr_ogi\",    \"ukr_ogi88\",    \"ukr_hom\",    \"ukr_gyz\",    \"ukr_tur\",    \"ukr_tur2\",    \"ukr_kul\",    \"ukr_umts\",    \"ukr_der\",     \"rv60\",    \"lbla\", \"ukr_pop\",\"ukr_pop2\", \"egr\",\"eg_img\"]', '2023-12-30 17:53:51', '2024-04-27 19:58:43');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  ADD PRIMARY KEY (`id_fav_trans`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  MODIFY `id_fav_trans` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  ADD CONSTRAINT `fk_fav_trans_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
