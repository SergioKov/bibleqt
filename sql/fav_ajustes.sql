-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-08-2024 a las 16:48:59
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
-- Estructura de tabla para la tabla `fav_ajustes`
--

CREATE TABLE `fav_ajustes` (
  `id_fav_ajuste` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `fav_ajustes` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fav_ajustes`
--

INSERT INTO `fav_ajustes` (`id_fav_ajuste`, `id_user`, `username`, `fav_ajustes`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '{\r\n    \"wr_filter\": {\r\n        \"display\": \"block\"\r\n    },\r\n    \"btn_lang_all\": {\r\n        \"display\": \"none\",\r\n        \"class\": \"tab\",\r\n        \"stateActive\": true\r\n    },\r\n    \"one_lang\": {\r\n        \"checked\": true\r\n    },\r\n    \"many_lang\": {\r\n        \"checked\": false\r\n    },\r\n    \"btn_show_refs\": {\r\n        \"display\": \"block\",\r\n        \"classText\": \"btn\",\r\n        \"stateActive\": false\r\n    },\r\n    \"a_ref\": {\r\n        \"display\": \"none\"\r\n    },\r\n    \"arr_lang_act\": [\r\n        \"ua\"\r\n    ],\r\n    \"arr_lang_noact\": [\r\n        \"ru\",\r\n        \"es\"\r\n    ],\r\n    \"arr_trans_act\": [\r\n        \"ukr_fil\",\r\n        \"ukr_ogi\",\r\n        \"ukr_ogi88\",\r\n        \"ukr_hom\",\r\n        \"ukr_gyz\",\r\n        \"ukr_tur\",\r\n        \"ukr_tur2\",\r\n        \"ukr_kul\",\r\n        \"ukr_umts\"\r\n    ],\r\n    \"arr_trans_noact\": [\r\n        \"rstStrongRed\",\r\n        \"rstt\",\r\n        \"rsti2\",\r\n        \"rstm\",\r\n        \"abi\",\r\n        \"nrt\",\r\n        \"mdri\",\r\n        \"rsp\",\r\n        \"rbo15\",\r\n        \"rob\",\r\n        \"ukr_fil\",\r\n        \"ukr_ogi\",\r\n        \"ukr_ogi88\",\r\n        \"ukr_hom\",\r\n        \"ukr_gyz\",\r\n        \"ukr_tur\",\r\n        \"ukr_tur2\",\r\n        \"ukr_kul\",\r\n        \"ukr_umts\",\r\n        \"lbla\"\r\n    ],\r\n    \"aaa\": \"aaa\"\r\n}', '2024-08-16 16:35:30', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fav_ajustes`
--
ALTER TABLE `fav_ajustes`
  ADD PRIMARY KEY (`id_fav_ajuste`),
  ADD KEY `FK_fav_ajustes_users` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fav_ajustes`
--
ALTER TABLE `fav_ajustes`
  MODIFY `id_fav_ajuste` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fav_ajustes`
--
ALTER TABLE `fav_ajustes`
  ADD CONSTRAINT `FK_fav_ajustes_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
