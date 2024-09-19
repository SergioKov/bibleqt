-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-04-2024 a las 02:25:59
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
-- Estructura de tabla para la tabla `markers`
--

CREATE TABLE `markers` (
  `id_marker` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `arr_markers` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `markers`
--

INSERT INTO `markers` (`id_marker`, `id_user`, `username`, `arr_markers`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"trans\":\"ukr_ogi88\",\"BibleShortName\":\"Ukr_Ogi88\",\"ref\":\"u041fu0440. 1:3\",\"BookShortName\":\"u041fu0440.\",\"book\":\"19\",\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:58:43\"},{\"trans\":\"ukr_umts\",\"BibleShortName\":\"Ukr_UMTs*\",\"ref\":\"u041fu0440. 1:3\",\"BookShortName\":\"u041fu0440.\",\"book\":\"19\",\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:58:15\"},{\"trans\":\"ukr_ogi88\",\"BibleShortName\":\"Ukr_Ogi88\",\"ref\":\"u041fu0440. 1:2\",\"BookShortName\":\"u041fu0440.\",\"book\":\"19\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:58:10\"},{\"trans\":\"ukr_ogi88\",\"BibleShortName\":\"Ukr_Ogi88\",\"ref\":\"u041fu0440. 1:2\",\"BookShortName\":\"u041fu0440.\",\"book\":\"19\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:58:09\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u041fu0440. 1:2\",\"BookShortName\":\"u041fu0440.\",\"book\":\"19\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:58:05\"},{\"trans\":\"ukr_umts\",\"BibleShortName\":\"Ukr_UMTs*\",\"ref\":\"u041fu0440. 1:3\",\"BookShortName\":\"u041fu0440.\",\"book\":\"19\",\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:58:01\"},{\"trans\":\"ukr_umts\",\"BibleShortName\":\"Ukr_UMTs*\",\"ref\":\"u041fu0440. 1:4\",\"BookShortName\":\"u041fu0440.\",\"book\":\"19\",\"chapter\":\"1\",\"verse\":\"4\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:57:58\"},{\"trans\":\"ukr_ogi88\",\"BibleShortName\":\"Ukr_Ogi88\",\"ref\":\"u041fu0441. 116:1\",\"BookShortName\":\"u041fu0441.\",\"book\":\"18\",\"chapter\":\"116\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:57:53\"},{\"trans\":\"ukr_ogi88\",\"BibleShortName\":\"Ukr_Ogi88\",\"ref\":\"u041fu0441. 116:2\",\"BookShortName\":\"u041fu0441.\",\"book\":\"18\",\"chapter\":\"116\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:57:49\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u041fu0441. 116:2\",\"BookShortName\":\"u041fu0441.\",\"book\":\"18\",\"chapter\":\"116\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:57:45\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u041fu0441. 116:1\",\"BookShortName\":\"u041fu0441.\",\"book\":\"18\",\"chapter\":\"116\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:57:41\"},{\"trans\":\"ukr_umts\",\"BibleShortName\":\"Ukr_UMTs*\",\"ref\":\"u041fu0441. 117:1\",\"BookShortName\":\"u041fu0441.\",\"book\":\"18\",\"chapter\":\"117\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:57:37\"},{\"trans\":\"ukr_umts\",\"BibleShortName\":\"Ukr_UMTs*\",\"ref\":\"u041fu0441. 117:2\",\"BookShortName\":\"u041fu0441.\",\"book\":\"18\",\"chapter\":\"117\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:57:33\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u041fu0441. 117:3\",\"BookShortName\":\"u041fu0441.\",\"book\":\"18\",\"chapter\":\"117\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:41:22\"},{\"trans\":\"rsp\",\"BibleShortName\":\"RSP\",\"ref\":\"1u0426u0430u0440. 1:8\",\"BookShortName\":\"1u0426u0430u0440.\",\"book\":\"8\",\"chapter\":\"1\",\"verse\":\"8\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:33:28\"},{\"trans\":\"rsp\",\"BibleShortName\":\"RSP\",\"ref\":\"3u0426u0430u0440. 1:11\",\"BookShortName\":\"3u0426u0430u0440.\",\"book\":\"10\",\"chapter\":\"1\",\"verse\":\"11\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:24:00\"},{\"trans\":\"ukr_tur2\",\"BibleShortName\":\"Ukr_Tur2\",\"ref\":\"1u0426u0430u0440. 1:4\",\"BookShortName\":\"1u0426u0430u0440.\",\"book\":\"10\",\"chapter\":\"1\",\"verse\":\"4\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:23:45\"},{\"trans\":\"rsp\",\"BibleShortName\":\"RSP\",\"ref\":\"3u0426u0430u0440. 1:5\",\"BookShortName\":\"3u0426u0430u0440.\",\"book\":\"10\",\"chapter\":\"1\",\"verse\":\"5\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:23:38\"},{\"trans\":\"rsp\",\"BibleShortName\":\"RSP\",\"ref\":\"3u0426u0430u0440. 1:5\",\"BookShortName\":\"3u0426u0430u0440.\",\"book\":\"10\",\"chapter\":\"1\",\"verse\":\"5\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:23:32\"},{\"trans\":\"ukr_umts\",\"BibleShortName\":\"Ukr_UMTs*\",\"ref\":\"1u0421u0430u043c. 1:3\",\"BookShortName\":\"1u0421u0430u043c.\",\"book\":\"8\",\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:20:35\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0414u0435u044fu043d. 17:20\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":\"43\",\"chapter\":\"17\",\"verse\":\"20\",\"to_verse\":null,\"fecha\":\"27/4/2024\",\"hora\":\"19:18:17\"}]', '2023-12-30 17:53:51', '2024-04-27 19:58:43');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id_marker`),
  ADD KEY `FK_markers_users` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `markers`
--
ALTER TABLE `markers`
  MODIFY `id_marker` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
