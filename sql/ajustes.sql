-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-08-2024 a las 01:34:14
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

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
-- Estructura de tabla para la tabla `ajustes`
--

CREATE TABLE `ajustes` (
  `id_obj_ajuste` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `obj_ajustes` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ajustes`
--

INSERT INTO `ajustes` (`id_obj_ajuste`, `id_user`, `username`, `obj_ajustes`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '{\"verseCompare\":{\"wr_filter\":{\"display\":\"block\"},\"btn_lang_all\":{\"display\":\"block\",\"class\":\"tab tab_active\",\"stateActive\":true},\"one_lang\":{\"checked\":false},\"many_lang\":{\"checked\":true},\"btn_show_refs\":{\"display\":\"block\",\"classText\":\"btn\",\"stateActive\":false},\"a_ref\":{\"display\":\"none\"},\"arr_lang_act\":[\"es\"],\"arr_lang_noact\":[\"ru\",\"ua\"],\"arr_trans_act\":[\"rv60\",\"lbla\"],\"arr_trans_noact\":[\"rstStrongRed\",\"rstt\",\"rsti2\",\"rstm\",\"abi\",\"nrt\",\"mdri\",\"rsp\",\"rbo15\",\"rob\",\"ukr_fil\",\"ukr_ogi\",\"ukr_ogi88\",\"ukr_hom\",\"ukr_gyz\",\"ukr_tur\",\"ukr_tur2\",\"ukr_kul\",\"ukr_umts\",\"egr\",\"eg_img\"],\"aaa\":\"aaa\"},\"lang\":\"en\"}', '2024-08-16 16:35:30', '2024-08-17 01:31:10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD PRIMARY KEY (`id_obj_ajuste`),
  ADD KEY `FK_fav_ajustes_users` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  MODIFY `id_obj_ajuste` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD CONSTRAINT `FK_fav_ajustes_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
