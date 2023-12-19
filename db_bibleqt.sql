-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-12-2023 a las 00:56:51
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
-- Base de datos: `db_bibleqt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password_text` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password_text`, `password`, `salt`, `email`, `created_at`, `updated_at`) VALUES
(1, 'Sergio', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'sergiokovalchuk@gmail.com', '2023-12-13 13:08:15', NULL),
(2, 'Juan', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'juan@gmail.com', '2023-12-18 13:08:15', NULL),
(3, 'Mark', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'mark@gmail.com', '2023-12-13 13:08:15', NULL),
(4, 'Lucas', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'lucas@gmail.com', '2023-12-13 13:08:15', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vkladki`
--

CREATE TABLE `vkladki` (
  `id_vkladka` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `arr` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vkladki`
--

INSERT INTO `vkladki` (`id_vkladka`, `id_user`, `username`, `arr`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"1u0426u0430u0440. 6:6\"},{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"ukr_umts, ukr_ogi, rv60\",\"title\":\"Ukr_UMTs*, Ukr_Ogi, RV60\",\"btn_close\":true,\"ref\":\"u0421u043eu0444. 2:14\"},{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_ogi, ukr_hom\",\"title\":\"RST+r, Ukr_Ogi, Ukr_Hom\",\"btn_close\":true,\"ref\":\"3u0426u0430u0440. 1\"},{\"id\":\"tab6\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"3u0426u0430u0440. 1:1\"}]', '2023-12-18 13:13:43', '2023-12-20 00:55:32'),
(2, 2, 'Juan', '[{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref\":\"u0411u044bu0442. 1:1\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref\":\"u0427u0438u0441. 5\"},{\"id\":\"tab1\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref\":\"u0412u0442u043eu0440. 4:29\"}]', '2023-12-18 13:28:53', '2023-12-20 00:39:38'),
(3, 3, 'Mark', '[{\"id\":\"tab1\",\"className\":\"tabs tab_active\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref\":\"u0418u043eu0430u043d. 1:1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"Mat. 5:3\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60\",\"title\":\"RST+r, RV60\",\"btn_close\":true,\"ref\":\"Ex. 2:2\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, nrt, abi\",\"title\":\"RST+r, NRT, ABi\",\"btn_close\":true,\"ref\":\"Psa. 22:1\"},{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rv60, lbla, ukr_hom, ukr_der, ukr_umts\",\"title\":\"RV60, LBLA, Ukr_Hom, Ukr_Der, Ukr_UMTs*\",\"btn_close\":true,\"ref\":\"Psa. 23:1\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60, lbla, ukr_hom, ukr_der, ukr_umts\",\"title\":\"RST+r, RV60, LBLA, Ukr_Hom, Ukr_Der, Ukr_UMTs*\",\"btn_close\":true,\"ref\":\"Psa. 22:2\"},{\"id\":\"tab7\",\"className\":\"tabs\",\"str_trans\":\"rv60, rstStrongRed, nrt, abi\",\"title\":\"RV60, RST+r, NRT, ABi\",\"btn_close\":true,\"ref\":\"Psa. 23:3\"},{\"id\":\"tab8\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60\",\"title\":\"RST+r, RV60\",\"btn_close\":true,\"ref\":\"u0427u0438u0441u043b. 13:1\"},{\"id\":\"tab9\",\"className\":\"tabs\",\"str_trans\":\"rv60, rstStrongRed\",\"title\":\"RV60, RST+r\",\"btn_close\":true,\"ref\":\"u0427u0438u0441u043b. 12:1\"},{\"id\":\"tab10\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60, ukr_ogi\",\"title\":\"RST+r, RV60, Ukr_Ogi\",\"btn_close\":true,\"ref\":\"Lev. 3:3\"},{\"id\":\"tab11\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_ogi, rv60, lbla\",\"title\":\"RST+r, Ukr_Ogi, RV60, LBLA\",\"btn_close\":true,\"ref\":\"u041fu0440u0438u0442. 4:23\"},{\"id\":\"tab12\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_ogi, ukr_hom, rv60, lbla\",\"title\":\"RST+r, Ukr_Ogi, Ukr_Hom, RV60, LBLA\",\"btn_close\":true,\"ref\":\"u041cu0430u0442u0444. 5:8\"},{\"id\":\"tab13\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60, lbla, ukr_gyz, ukr_fil, ukr_tur\",\"title\":\"RST+r, RV60, LBLA, Ukr_Gyz, Ukr_Fil, Ukr_Tur\",\"btn_close\":true,\"ref\":\"u0420u0438u043c. 6:10\"},{\"id\":\"tab14\",\"className\":\"tabs\",\"str_trans\":\"ukr_ogi, ukr_hom, ukr_gyz, ukr_fil, ukr_tur, rstStrongRed, rv60\",\"title\":\"Ukr_Ogi, Ukr_Hom, Ukr_Gyz, Ukr_Fil, Ukr_Tur, RST+r, RV60\",\"btn_close\":true,\"ref\":\"u041bu0443u043a. 7:16\"},{\"id\":\"tab15\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, nrt, rv60, lbla, ukr_ogi, ukr_hom, ukr_gyz, ukr_fil, ukr_tur\",\"title\":\"RST+r, NRT, RV60, LBLA, Ukr_Ogi, Ukr_Hom, Ukr_Gyz, Ukr_Fil, Ukr_Tur\",\"btn_close\":true,\"ref\":\"Is. 8:9\"},{\"id\":\"tab16\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, nrt, rv60, lbla, ukr_ogi, ukr_hom, ukr_gyz, ukr_fil, ukr_tur\",\"title\":\"RST+r, NRT, RV60, LBLA, Ukr_Ogi, Ukr_Hom, Ukr_Gyz, Ukr_Fil, Ukr_Tur\",\"btn_close\":true,\"ref\":\"Psa. 118:1\"}]', '2023-12-18 13:31:56', '2023-12-18 13:37:51'),
(4, 4, 'Lucas', '[{\"id\":\"tab1\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"u0411u044bu0442. 1:1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"u0418u0441u0445. 2:2\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"u041bu0435u0432. 3:3\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"u0427u0438u0441. 4:4\"},{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref\":\"u041bu0443u043a. 24:48\"}]', '2023-12-18 13:59:54', '2023-12-19 14:40:57');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD PRIMARY KEY (`id_vkladka`),
  ADD KEY `FK_vkladki_users` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  MODIFY `id_vkladka` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD CONSTRAINT `FK_vkladki_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
