-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-12-2023 a las 00:51:28
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
(1, 3, 'SERGIO', '[{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u041eu0442u0446u0435 u0438 u0432 u0413\",\"count_verses\":11,\"count_matches\":26,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"23:01:30\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u0421u0438u043bu0443u0430u043du0430 u0438 u0422u0438u043cu043eu0444u0435u044f\",\"count_verses\":2,\"count_matches\":0,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"23:01:24\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"23:01:16\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"22:48:52\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"22:30:58\"}]', '2023-12-30 20:03:03', '2023-12-30 23:01:31');

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
(1, 1, 'Sergio', '[{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 15:35\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"15\",\"verse\":\"35\",\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:41:11\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u041fu0435u0442u0440. 1\",\"BookShortName\":\"1u041fu0435u0442u0440.\",\"book\":59,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:40:44\"}]', '2023-12-30 17:53:51', '2023-12-31 00:41:11'),
(2, 3, 'SERGIO', '[{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:05:25\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"31/12/2023\",\"hora\":\"00:05:24\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:00:26\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 15:35\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"15\",\"verse\":\"35\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:55:22\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:52\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u0430u043c. 14:16\",\"BookShortName\":\"1u0421u0430u043c.\",\"book\":\"8\",\"chapter\":\"14\",\"verse\":\"16\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:27\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u0430u043c. 14\",\"BookShortName\":\"1u0421u0430u043c.\",\"book\":\"8\",\"chapter\":\"14\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:26\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u0430u043c. \",\"BookShortName\":\"1u0421u0430u043c.\",\"book\":\"8\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:25\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u043eu043b. 1:6\",\"BookShortName\":\"1u0421u043eu043b.\",\"book\":\"51\",\"chapter\":\"1\",\"verse\":\"6\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:22\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1:2\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":\"51\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:06\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:57\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:59:55\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:49\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u041au043eu043b. 1\",\"BookShortName\":\"u041au043eu043b.\",\"book\":50,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0424u0438u043b. 1\",\"BookShortName\":\"u0424u0438u043b.\",\"book\":49,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0415u0444. 1\",\"BookShortName\":\"u0415u0444.\",\"book\":48,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0413u0430u043b. 1\",\"BookShortName\":\"u0413u0430u043b.\",\"book\":47,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"2u041au043eu0440. 1\",\"BookShortName\":\"2u041au043eu0440.\",\"book\":46,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u041au043eu0440. 1\",\"BookShortName\":\"1u041au043eu0440.\",\"book\":45,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0420u0438u043c. 1\",\"BookShortName\":\"u0420u0438u043c.\",\"book\":44,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0414u0435u044fu043d. 1\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":43,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:58:58\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 5:3\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"5\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:58:38\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:47:53\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:47:25\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:55\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:9\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"9\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:49\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:2\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:3\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:46\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:4\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"4\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:46\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:5\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"5\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:45\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:02:47\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 25:19\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":\"25\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:02:37\"}]', '2023-12-30 17:55:11', '2023-12-31 00:05:25'),
(3, 2, 'Juan', '[{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u041fu0435u0442u0440. 1\",\"BookShortName\":\"1u041fu0435u0442u0440.\",\"book\":59,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:38:32\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"2u041fu0435u0442u0440. 1\",\"BookShortName\":\"2u041fu0435u0442u0440.\",\"book\":60,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:38:32\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1Iu0432u0430u043d. 1\",\"BookShortName\":\"1Iu0432u0430u043d.\",\"book\":61,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:38:31\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"2Iu0432u0430u043d. 1\",\"BookShortName\":\"2Iu0432u0430u043d.\",\"book\":62,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:38:30\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"3Iu0432u0430u043d. 1\",\"BookShortName\":\"3Iu0432u0430u043d.\",\"book\":63,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:38:24\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u041fu0435u0442u0440. 1\",\"BookShortName\":\"1u041fu0435u0442u0440.\",\"book\":\"59\",\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:33:41\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u041fu0435u0442u0440. 3:14\",\"BookShortName\":\"1u041fu0435u0442u0440.\",\"book\":\"59\",\"chapter\":\"3\",\"verse\":\"14\",\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:57\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u041fu0435u0442u0440. 3\",\"BookShortName\":\"1u041fu0435u0442u0440.\",\"book\":\"59\",\"chapter\":\"3\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:56\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u041fu0435u0442u0440. 1\",\"BookShortName\":\"1u041fu0435u0442u0440.\",\"book\":59,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:51\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"2u041fu0435u0442u0440. 1\",\"BookShortName\":\"2u041fu0435u0442u0440.\",\"book\":60,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:50\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1Iu0432u0430u043d. 1\",\"BookShortName\":\"1Iu0432u0430u043d.\",\"book\":61,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:49\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"2Iu0432u0430u043d. 1\",\"BookShortName\":\"2Iu0432u0430u043d.\",\"book\":62,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:48\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"3Iu0432u0430u043d. 1\",\"BookShortName\":\"3Iu0432u0430u043d.\",\"book\":63,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:47\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"u042eu0434. 1\",\"BookShortName\":\"u042eu0434.\",\"book\":64,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:45\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"u041eu0431. 1\",\"BookShortName\":\"u041eu0431.\",\"book\":65,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:27:43\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"u0411u0443u0442. 4\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":0,\"chapter\":\"4\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:24:37\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 15:39\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"15\",\"verse\":\"39\",\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:24:21\"}]', '2023-12-30 19:19:24', '2023-12-31 00:38:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hist_strong`
--

CREATE TABLE `hist_strong` (
  `id_hist_strong` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `arr_hist_strong` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hist_strong`
--

INSERT INTO `hist_strong` (`id_hist_strong`, `id_user`, `username`, `arr_hist_strong`, `created_at`, `updated_at`) VALUES
(1, 3, 'SERGIO', '[{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"fecha\":\"30/12/2023\",\"hora\":\"23:31:17\"}]', '2023-12-30 23:31:19', NULL);

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
(1, 1, 'Sergio', '[{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0414u0435u044fu043d. 22:19\"},{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0414u0435u044fu043d. 22:19\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 15\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 15:35\"},{\"id\":\"tab4\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 15:35\"}]', '2023-12-18 13:13:43', '2023-12-31 00:41:12'),
(2, 2, 'Juan', '[{\"id\":\"tab10\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u041eu0431. 1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u042eu0434. 1\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"3Iu0432u0430u043d. 1\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"2Iu0432u0430u043d. 1\"},{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"1Iu0432u0430u043d. 1\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"2u041fu0435u0442u0440. 1\"},{\"id\":\"tab7\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"1u041fu0435u0442u0440. 1\"}]', '2023-12-18 13:28:53', '2023-12-31 00:38:43'),
(3, 3, 'SERGIO', '[{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref_trans\":\"nrt\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref_trans\":\"nrt\",\"ref\":\"1u0424u0435u0441u0441. 1\"},{\"id\":\"tab2\",\"className\":\"tabs tab_active\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref_trans\":\"nrt\",\"ref\":\"1u0424u0435u0441u0441. 1\"}]', '2023-12-18 13:31:56', '2023-12-31 00:05:25'),
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
-- Indices de la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  ADD PRIMARY KEY (`id_hist_strong`),
  ADD KEY `FK_hist_strong_users` (`id_user`);

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
  MODIFY `id_hist_find` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  MODIFY `id_hist_nav` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  MODIFY `id_hist_strong` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Filtros para la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  ADD CONSTRAINT `FK_hist_strong_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD CONSTRAINT `FK_vkladki_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
