-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-12-2023 a las 22:43:34
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
-- Estructura de tabla para la tabla `hist_find`
--

CREATE TABLE `hist_find` (
  `id_hist_find` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `arr_hist_find` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hist_find`
--

INSERT INTO `hist_find` (`id_hist_find`, `id_user`, `username`, `arr_hist_find`, `created_at`, `updated_at`) VALUES
(1, 3, 'SERGIO', '[{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"22:30:58\"}]', '2023-12-30 20:03:03', '2023-12-30 22:31:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hist_nav`
--

CREATE TABLE `hist_nav` (
  `id_hist_nav` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `arr_hist_nav` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hist_nav`
--

INSERT INTO `hist_nav` (`id_hist_nav`, `id_user`, `username`, `arr_hist_nav`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 15:35\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"15\",\"verse\":\"35\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"17:53:13\"}]', '2023-12-30 17:53:51', NULL),
(2, 3, 'SERGIO', '[{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:55\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:9\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"9\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:49\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:2\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:3\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:46\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:4\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"4\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:46\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:5\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"5\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:45\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:02:47\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 25:19\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":\"25\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:02:37\"}]', '2023-12-30 17:55:11', '2023-12-30 20:04:55'),
(3, 2, 'Juan', '[{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"u0411u0443u0442. 4\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":0,\"chapter\":\"4\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:36:08\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:34\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"34\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:14\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:21\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"21\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:13\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:14\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"14\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:13\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:10\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:13\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:6\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"6\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:12\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:9\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"9\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:12\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:18\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"18\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:11\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:19\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:11\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:16\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"16\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:11\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:8\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"8\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:10\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:7\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"7\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:10\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:10\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:10\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:14\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"14\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:09\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:19\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:09\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:30\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"30\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:08\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:18\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"18\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:07\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:10\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:07\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:6\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"6\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:07\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:9\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"9\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:06\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:21\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"21\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:06\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:11\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"11\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:05\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:10\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:05\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:11\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"11\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:35:05\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:22\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"22\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:24:33\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:11\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"11\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:24:32\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:34\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"34\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:24:29\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:22\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"22\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:24:28\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041bu0443u043a. 18:20\",\"BookShortName\":\"u041bu0443u043a.\",\"book\":\"41\",\"chapter\":\"18\",\"verse\":\"20\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"19:23:57\"}]', '2023-12-30 19:19:24', '2023-12-30 19:36:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password_text` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password_text`, `password`, `salt`, `email`, `created_at`, `updated_at`, `reset_token`, `reset_token_expiry`) VALUES
(1, 'Sergio', '123456', '$2y$10$TA2vJU4TW7xEtbnjp73N3uarbtUANYu/5Cn4gReTvtbWvDF9/ZQM.', '32303030', 'sergiokovalchuk@gmail.com', '2023-12-13 13:08:15', NULL, NULL, NULL),
(2, 'Juan', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'juan@gmail.com', '2023-12-18 13:08:15', NULL, NULL, NULL),
(3, 'SERGIO', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'mark@gmail.com', '2023-12-13 13:08:15', NULL, NULL, NULL),
(4, 'Lucas', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'lucas@gmail.com', '2023-12-13 13:08:15', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vkladki`
--

CREATE TABLE `vkladki` (
  `id_vkladka` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `arrTabs` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vkladki`
--

INSERT INTO `vkladki` (`id_vkladka`, `id_user`, `username`, `arrTabs`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0414u0435u044fu043d. 22:19\"},{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0414u0435u044fu043d. 22:19\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 15\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 15:35\"},{\"id\":\"tab4\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 15:35\"}]', '2023-12-18 13:13:43', '2023-12-30 17:54:15'),
(2, 2, 'Juan', '[{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab7\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab8\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab9\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab10\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"}]', '2023-12-18 13:28:53', '2023-12-30 19:36:19'),
(3, 3, 'SERGIO', '[{\"id\":\"tab1\",\"className\":\"tabs tab_active\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref_trans\":\"nrt\",\"ref\":\"u0418u043eu0430u043d. 1:1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 5:3\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60\",\"title\":\"RST+r, RV60\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0418u0441u0445. 2:2\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, nrt, abi\",\"title\":\"RST+r, NRT, ABi\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041fu0441. 22:1\"},{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rv60, lbla, ukr_hom, ukr_der, ukr_umts\",\"title\":\"RV60, LBLA, Ukr_Hom, Ukr_Der, Ukr_UMTs*\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"Psa. 23:1\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60, lbla, ukr_hom, ukr_der, ukr_umts\",\"title\":\"RST+r, RV60, LBLA, Ukr_Hom, Ukr_Der, Ukr_UMTs*\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"Psa. 22:2\"},{\"id\":\"tab7\",\"className\":\"tabs\",\"str_trans\":\"rv60, rstStrongRed, nrt, abi\",\"title\":\"RV60, RST+r, NRT, ABi\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"Psa. 23:3\"},{\"id\":\"tab8\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60\",\"title\":\"RST+r, RV60\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0427u0438u0441u043b. 13:1\"},{\"id\":\"tab9\",\"className\":\"tabs\",\"str_trans\":\"rv60, rstStrongRed\",\"title\":\"RV60, RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0427u0438u0441u043b. 12:1\"},{\"id\":\"tab10\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60, ukr_ogi\",\"title\":\"RST+r, RV60, Ukr_Ogi\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"Lev. 3:3\"},{\"id\":\"tab11\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_ogi, rv60, lbla\",\"title\":\"RST+r, Ukr_Ogi, RV60, LBLA\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u041fu0440u0438u0442. 4:23\"},{\"id\":\"tab12\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_ogi, ukr_hom, rv60, lbla\",\"title\":\"RST+r, Ukr_Ogi, Ukr_Hom, RV60, LBLA\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u041cu0430u0442u0444. 5:8\"},{\"id\":\"tab13\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, rv60, lbla, ukr_gyz, ukr_fil, ukr_tur\",\"title\":\"RST+r, RV60, LBLA, Ukr_Gyz, Ukr_Fil, Ukr_Tur\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0420u0438u043c. 6:10\"},{\"id\":\"tab14\",\"className\":\"tabs\",\"str_trans\":\"ukr_ogi, ukr_hom, ukr_gyz, ukr_fil, ukr_tur, rstStrongRed, rv60\",\"title\":\"Ukr_Ogi, Ukr_Hom, Ukr_Gyz, Ukr_Fil, Ukr_Tur, RST+r, RV60\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u041bu0443u043a. 7:16\"},{\"id\":\"tab15\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, nrt, rv60, lbla, ukr_ogi, ukr_hom, ukr_gyz, ukr_fil, ukr_tur\",\"title\":\"RST+r, NRT, RV60, LBLA, Ukr_Ogi, Ukr_Hom, Ukr_Gyz, Ukr_Fil, Ukr_Tur\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"Is. 8:9\"},{\"id\":\"tab16\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, nrt, rv60, lbla, ukr_ogi, ukr_hom, ukr_gyz, ukr_fil, ukr_tur\",\"title\":\"RST+r, NRT, RV60, LBLA, Ukr_Ogi, Ukr_Hom, Ukr_Gyz, Ukr_Fil, Ukr_Tur\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"Psa. 118:1\"}]', '2023-12-18 13:31:56', '2023-12-30 21:58:00'),
(4, 4, 'Lucas', '[{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0411u044bu0442. 1:1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0418u0441u0445. 2:2\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u041bu0435u0432. 3:3\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0427u0438u0441. 4:4\"},{\"id\":\"tab5\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041bu0443u043a. 24:48\"}]', '2023-12-18 13:59:54', '2023-12-28 13:55:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hist_find`
--
ALTER TABLE `hist_find`
  ADD PRIMARY KEY (`id_hist_find`),
  ADD KEY `FK_hist_find_users` (`id_user`);

--
-- Indices de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  ADD PRIMARY KEY (`id_hist_nav`),
  ADD KEY `FK_hist_nav_users` (`id_user`);

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
-- AUTO_INCREMENT de la tabla `hist_find`
--
ALTER TABLE `hist_find`
  MODIFY `id_hist_find` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  MODIFY `id_hist_nav` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  MODIFY `id_vkladka` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hist_find`
--
ALTER TABLE `hist_find`
  ADD CONSTRAINT `FK_hist_find_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  ADD CONSTRAINT `FK_hist_nav_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD CONSTRAINT `FK_vkladki_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
