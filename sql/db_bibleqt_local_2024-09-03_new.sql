-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2024 a las 16:18:11
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
-- Estructura de tabla para la tabla `ajustes`
--

CREATE TABLE `ajustes` (
  `id_ajuste` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `obj_ajustes` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ajustes`
--

INSERT INTO `ajustes` (`id_ajuste`, `id_user`, `username`, `obj_ajustes`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '{\"verseCompare\":{\"wr_filter\":{\"display\":\"none\"},\"btn_lang_all\":{\"display\":\"block\",\"class\":\"btn\",\"stateActive\":true},\"one_lang\":{\"checked\":false},\"many_lang\":{\"checked\":true},\"btn_show_refs\":{\"display\":\"block\",\"classText\":\"btn\",\"stateActive\":false},\"a_ref\":{\"display\":\"none\"},\"arr_lang_act\":[],\"arr_lang_noact\":[],\"arr_trans_act\":[],\"arr_trans_noact\":[],\"aaa\":\"aaa\"},\"lang\":\"es\"}', '2024-09-03 16:06:48', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fav_trans`
--

CREATE TABLE `fav_trans` (
  `id_fav_trans` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `arrFavTrans` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hist_find`
--

CREATE TABLE `hist_find` (
  `id_hist_find` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `arr_hist_find` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hist_nav`
--

CREATE TABLE `hist_nav` (
  `id_hist_nav` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `arr_hist_nav` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `hist_nav`
--

INSERT INTO `hist_nav` (`id_hist_nav`, `id_user`, `username`, `arr_hist_nav`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 1:3\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"3/9/2024\",\"hora\":\"16:07:11\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 1:1\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"3/9/2024\",\"hora\":\"16:06:47\"}]', '2024-09-03 16:06:48', '2024-09-03 16:07:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hist_strong`
--

CREATE TABLE `hist_strong` (
  `id_hist_strong` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `arr_hist_strong` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `markers`
--

CREATE TABLE `markers` (
  `id_marker` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `arr_markers` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `markers`
--

INSERT INTO `markers` (`id_marker`, `id_user`, `username`, `arr_markers`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 1:4\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"1\",\"verse\":\"4\",\"verseText\":\"u0418 u0443u0432u0438u0434u0435u043b   u0411u043eu0433  u0441u0432u0435u0442,  u0447u0442u043e  u043eu043d u0445u043eu0440u043eu0448,  u0438 u043eu0442u0434u0435u043bu0438u043b   u0411u043eu0433  u0441u0432u0435u0442  u043eu0442  u0442u044cu043cu044b.\",\"to_verse\":null,\"fecha\":\"3/9/2024\",\"hora\":\"16:06:59\"}]', '2024-09-03 16:06:59', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_text` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `is_email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `email_token` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password_text`, `password`, `salt`, `email`, `is_email_verified`, `email_token`, `last_login`, `created_at`, `updated_at`, `reset_token`, `reset_token_expiry`) VALUES
(1, 'Sergio', '123123', '$2y$10$raMhfGrhzXTDFaIWkf8C9.gkJO/oAJCZG301oBLKWyyH3YedTJOa6', '32303030', 'sergiokovalchuk@gmail.com', 1, '', '2024-09-03 16:06:43', '2024-09-03 15:55:00', NULL, NULL, NULL),
(2, 'SergBass2000', '123123', '$2y$10$59TW6/BQpI1doAaZb2IcK.JmmqoWbc.KPY1pU1l95QGQQM0IbbWt6', '32303030', 'sergbass2000@gmail.com', 1, NULL, NULL, '2024-09-03 16:05:12', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vkladki`
--

CREATE TABLE `vkladki` (
  `id_vkladka` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `arrTabs` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vkladki`
--

INSERT INTO `vkladki` (`id_vkladka`, `id_user`, `username`, `arrTabs`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"id\":\"tab1\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, rsti2\",\"title\":\"RST+r, RSTi2*\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0411u044bu0442. 1:3\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rsti2\",\"title\":\"RST+r, RSTi2*\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0411u044bu0442. 1:3\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rsti2\",\"title\":\"RST+r, RSTi2*\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0411u044bu0442. 1:3\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rsti2\",\"title\":\"RST+r, RSTi2*\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0411u044bu0442. 1:3\"}]', '2024-09-03 16:06:43', '2024-09-03 16:07:15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD PRIMARY KEY (`id_ajuste`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  ADD PRIMARY KEY (`id_fav_trans`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `hist_find`
--
ALTER TABLE `hist_find`
  ADD PRIMARY KEY (`id_hist_find`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  ADD PRIMARY KEY (`id_hist_nav`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  ADD PRIMARY KEY (`id_hist_strong`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id_marker`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email_unique` (`email`);

--
-- Indices de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD PRIMARY KEY (`id_vkladka`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  MODIFY `id_ajuste` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  MODIFY `id_fav_trans` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hist_find`
--
ALTER TABLE `hist_find`
  MODIFY `id_hist_find` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  MODIFY `id_hist_nav` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  MODIFY `id_hist_strong` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `markers`
--
ALTER TABLE `markers`
  MODIFY `id_marker` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  MODIFY `id_vkladka` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD CONSTRAINT `ajustes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  ADD CONSTRAINT `fav_trans_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hist_find`
--
ALTER TABLE `hist_find`
  ADD CONSTRAINT `hist_find_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  ADD CONSTRAINT `hist_nav_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  ADD CONSTRAINT `hist_strong_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `markers`
--
ALTER TABLE `markers`
  ADD CONSTRAINT `markers_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD CONSTRAINT `vkladki_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
