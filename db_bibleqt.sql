-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: PMYSQL120.dns-servicio.com:3306
-- Tiempo de generación: 19-03-2024 a las 00:29:31
-- Versión del servidor: 5.7.41
-- Versión de PHP: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `7229353_db_bibleqt`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `hist_find`
--

INSERT INTO `hist_find` (`id_hist_find`, `id_user`, `username`, `arr_hist_find`, `created_at`, `updated_at`) VALUES
(1, 3, 'SERGIO', '[{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u041eu0442u0446u0435 u0438 u0432 u0413\",\"count_verses\":11,\"count_matches\":26,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"23:01:30\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u0421u0438u043bu0443u0430u043du0430 u0438 u0422u0438u043cu043eu0444u0435u044f\",\"count_verses\":2,\"count_matches\":0,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"23:01:24\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"23:01:16\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"22:48:52\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"30/12/2023\",\"hora\":\"22:30:58\"}]', '2023-12-30 20:03:03', '2023-12-30 23:01:31'),
(3, 1, 'Sergio', '[{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0411u044cu044e u0432u043eu0437u0434u0443u0445\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"NT\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"10/3/2024\",\"hora\":\"12:25:44\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0427u0442u043e u0438u0437u0431u0438u0440u0430u0435u0442\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"NT\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"10/3/2024\",\"hora\":\"12:09:26\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0417u0430u0440u043eu0434u044bu0448\",\"count_verses\":2,\"count_matches\":2,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"3/3/2024\",\"hora\":\"11:42:59\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u041fu043eu043cu044bu0441u043bu044b\",\"count_verses\":6,\"count_matches\":6,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"3/3/2024\",\"hora\":\"11:42:16\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0417u043bu043e u0432u043e u0432u0441u044fu043au043eu0435 u0432u0440u0435u043cu044f\",\"count_verses\":2,\"count_matches\":2,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"3/3/2024\",\"hora\":\"11:37:51\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0427u0442u043e u044du0442u043e u0437u0430 u043du043eu0432u043eu0435\",\"count_verses\":2,\"count_matches\":2,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"28/2/2024\",\"hora\":\"21:10:21\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u041du0435u0443u0434u043eu0431u043eu0432u0440u0430\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"28/2/2024\",\"hora\":\"20:53:43\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0421u043eu0433u043bu0430u0441u043du043e u043fu0440u043eu0440u043e\",\"count_verses\":2,\"count_matches\":2,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"26/2/2024\",\"hora\":\"20:46:49\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0421u043du043eu0432u0438u0434u0435u043du0438\",\"count_verses\":11,\"count_matches\":11,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"26/2/2024\",\"hora\":\"20:26:19\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0421u043eu0433u043bu0430u0441u043du043e u043fu0440u043eu0440u043e\",\"count_verses\":2,\"count_matches\":2,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"26/2/2024\",\"hora\":\"20:24:35\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"H216\",\"count_verses\":64,\"count_matches\":67,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":true},\"fecha\":\"24/2/2024\",\"hora\":\"21:32:22\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0418u043cu0435u043du0438u044f u0443 u043du0435u0433u043e u0431u044bu043bu043e: u0441u0435u043cu044c u0442u044bu0441u044fu0447 u043cu0435u043bu043au043eu0433u043e u0441u043au043eu0442u0430\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"24/2/2024\",\"hora\":\"21:02:48\"},{\"trans\":\"rstm\",\"BibleShortName\":\"RSTm*\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"24/2/2024\",\"hora\":\"21:01:22\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u041du043e u043eu043d u0441u043au0430u0437u0430u043b u0432 u043eu0442u0432u0435u0442 u043eu0442u0446u0443\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"24/2/2024\",\"hora\":\"21:01:05\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0430 u043au043eu0433u0434u0430 u044du0442u043eu0442 u0441u044bu043d u0442u0432u043eu0439, u0440u0430u0441u0442u043eu0447u0438u0432u0448u0438u0439 u0438u043cu0435u043du0438u0435 u0441u0432u043eu0435 u0441 u0431u043bu0443u0434u043du0438u0446u0430u043cu0438\",\"count_verses\":1,\"count_matches\":0,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"24/2/2024\",\"hora\":\"21:00:52\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0442u044b u0443u0437u043du0430u043b u0442u0432u0435u0440u0434u043eu0435 u043eu0441u043du043eu0432u0430u043du0438u0435\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"31/12/2023\",\"hora\":\"02:15:48\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0440u0438u0445u043eu0434u044fu0442 u043a u0418u0438u0441u0443u0441u0443 u0418u0435u0440u0443u0441u0430u043bu0438u043cu0441u043au0438u0435 u043a\",\"count_verses\":1,\"count_matches\":4,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"31/12/2023\",\"hora\":\"02:15:23\"},{\"trans\":\"rstm\",\"BibleShortName\":\"RSTm*\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"31/12/2023\",\"hora\":\"01:19:59\"}]', '2023-12-31 01:20:00', '2024-03-10 12:25:43');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `hist_nav`
--

INSERT INTO `hist_nav` (`id_hist_nav`, `id_user`, `username`, `arr_hist_nav`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 1:1\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":0,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:50:04\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0414iu0457. 22:19\",\"BookShortName\":\"u0414iu0457.\",\"book\":43,\"chapter\":\"22\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:50:02\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"17\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:50:01\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:16\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:50:00\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"17/3/2024\",\"hora\":\"02:49:45\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:16\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:49:41\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"17/3/2024\",\"hora\":\"02:49:10\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"3\",\"verse\":\"17\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:49:00\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"17/3/2024\",\"hora\":\"02:48:39\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0414iu0457. 22:19\",\"BookShortName\":\"u0414iu0457.\",\"book\":43,\"chapter\":\"22\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:48:09\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0414u0435u044fu043d. 22:19\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":43,\"chapter\":\"22\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:55\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 7:2\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"7\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:36\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 7\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":7,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:34\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 6\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":6,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:34\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 5\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":5,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:34\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 4\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":4,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:34\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 3\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":3,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:33\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 2\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":2,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:47:33\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 1:1\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":0,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:40:38\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0418u043eu0430u043d. 4\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"4\",\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:40:22\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 1:1\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:40:17\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. 1\",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:40:15\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"u0411u0443u0442. \",\"BookShortName\":\"u0411u0443u0442.\",\"book\":\"0\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:40:14\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"Iu0432u0430u043d. 2\",\"BookShortName\":\"Iu0432u0430u043d.\",\"book\":\"42\",\"chapter\":2,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:40:11\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"Iu0432u0430u043d. 3\",\"BookShortName\":\"Iu0432u0430u043d.\",\"book\":\"42\",\"chapter\":3,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:40:10\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0418u043eu0430u043d. 4\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":4,\"verse\":null,\"to_verse\":null,\"fecha\":\"17/3/2024\",\"hora\":\"02:39:43\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"17/3/2024\",\"hora\":\"02:39:22\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0414u0435u044fu043d. 22:19\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":43,\"chapter\":\"22\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:31:05\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"14/3/2024\",\"hora\":\"14:30:39\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0418u043eu0430u043d. 4\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":4,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:30:32\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"14/3/2024\",\"hora\":\"14:29:00\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0414u0435u044fu043d. 21\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":\"43\",\"chapter\":21,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:28:49\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0414u0435u044fu043d. 22\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":\"43\",\"chapter\":22,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:28:47\"},{\"trans\":\"abi\",\"BibleShortName\":\"ABi\",\"ref\":\"u0414u0435u044fu043d. 21:9\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":\"43\",\"chapter\":\"21\",\"verse\":\"9\",\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:28:31\"},{\"trans\":\"rv60\",\"BibleShortName\":\"RV60\",\"ref\":\"Hch. 21:1\",\"BookShortName\":\"Hch.\",\"book\":\"43\",\"chapter\":\"21\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:25:19\"},{\"trans\":\"mdri\",\"BibleShortName\":\"MDRi\",\"ref\":\"u0414u0435u044fu043d. 21\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":43,\"chapter\":\"21\",\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:25:16\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 15:35\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"15\",\"verse\":\"35\",\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:25:15\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0414u0435u044fu043d. 22:19\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":43,\"chapter\":\"22\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:25:13\"},{\"trans\":\"mdri\",\"BibleShortName\":\"MDRi\",\"ref\":\"u0411u044bu0442. 1:1\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:23:38\"},{\"trans\":\"mdri\",\"BibleShortName\":\"MDRi\",\"ref\":\"u0411u044bu0442. 1\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:23:37\"},{\"trans\":\"mdri\",\"BibleShortName\":\"MDRi\",\"ref\":\"u0411u044bu0442. \",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:23:36\"},{\"trans\":\"ukr_der\",\"BibleShortName\":\"Ukr_Der\",\"ref\":\"u0415u0444. 2\",\"BookShortName\":\"u0415u0444.\",\"book\":\"48\",\"chapter\":2,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:22:26\"},{\"trans\":\"ukr_der\",\"BibleShortName\":\"Ukr_Der\",\"ref\":\"u0415u0444. 3\",\"BookShortName\":\"u0415u0444.\",\"book\":\"48\",\"chapter\":3,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:22:25\"},{\"trans\":\"ukr_der\",\"BibleShortName\":\"Ukr_Der\",\"ref\":\"u0415u0444. 2:1\",\"BookShortName\":\"u0415u0444.\",\"book\":48,\"chapter\":\"2\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"14:22:21\"},{\"trans\":\"ukr_der\",\"BibleShortName\":\"Ukr_Der\",\"ref\":\"2u0422u0438u043c. 1\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":54,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"02:00:03\"},{\"trans\":\"ukr_der\",\"BibleShortName\":\"Ukr_Der\",\"ref\":\"1u0422u0438u043c. 1\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":53,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:59:51\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"2u0422u0438u043c. 1\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":54,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:59:10\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u0422u0438u043c. 1\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":53,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:59:04\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"2u0422u0438u043c. 1\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":54,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:59:04\"},{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"u0422u0438u0442. 1\",\"BookShortName\":\"u0422u0438u0442.\",\"book\":55,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:59:02\"},{\"trans\":\"ukr_hom\",\"BibleShortName\":\"Ukr_Hom\",\"ref\":\"2u0422u0438u043c. 1\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":54,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:54\"},{\"trans\":\"ukr_hom\",\"BibleShortName\":\"Ukr_Hom\",\"ref\":\"1u0422u0438u043c. 1\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":53,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:52\"},{\"trans\":\"ukr_hom\",\"BibleShortName\":\"Ukr_Hom\",\"ref\":\"2u0422u0438u043c. 1\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":54,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:49\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"1u0422u0438u043c. 1\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":53,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:36\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"2u0424u0435u0441u0441. 1\",\"BookShortName\":\"2u0424u0435u0441u0441.\",\"book\":52,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:35\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"1u0422u0438u043c. 1\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":53,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:33\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"2u0422u0438u043c. 1\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":54,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:32\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0422u0438u0442. 1\",\"BookShortName\":\"u0422u0438u0442.\",\"book\":55,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:31\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"2u0422u0438u043c. 1\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":54,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:25\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"1u0422u0438u043c. \",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":\"53\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"14/3/2024\",\"hora\":\"01:58:22\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0420u0438u043c. 14:22\",\"BookShortName\":\"u0420u0438u043c.\",\"book\":44,\"chapter\":\"14\",\"verse\":\"22\",\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:49:50\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"2u0421u043eu043b. 1\",\"BookShortName\":\"2u0421u043eu043b.\",\"book\":52,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:49:44\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u043eu043b. 5:10\",\"BookShortName\":\"1u0421u043eu043b.\",\"book\":\"51\",\"chapter\":\"5\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:49:39\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u043eu043b. 5\",\"BookShortName\":\"1u0421u043eu043b.\",\"book\":\"51\",\"chapter\":\"5\",\"verse\":null,\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:49:38\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u043eu043b. \",\"BookShortName\":\"1u0421u043eu043b.\",\"book\":\"51\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:49:35\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0420u0438u043c. 15\",\"BookShortName\":\"u0420u0438u043c.\",\"book\":\"44\",\"chapter\":15,\"verse\":null,\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:49:18\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0420u0438u043c. 14:22\",\"BookShortName\":\"u0420u0438u043c.\",\"book\":44,\"chapter\":\"14\",\"verse\":\"22\",\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:49:05\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 1:1\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"11/3/2024\",\"hora\":\"01:48:57\"}]', '2023-12-30 17:53:51', '2024-03-17 02:50:04'),
(2, 3, 'SERGIO', '[{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:05:25\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"31/12/2023\",\"hora\":\"00:05:24\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"31/12/2023\",\"hora\":\"00:00:26\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 15:35\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"15\",\"verse\":\"35\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:55:22\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:52\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u0430u043c. 14:16\",\"BookShortName\":\"1u0421u0430u043c.\",\"book\":\"8\",\"chapter\":\"14\",\"verse\":\"16\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:27\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u0430u043c. 14\",\"BookShortName\":\"1u0421u0430u043c.\",\"book\":\"8\",\"chapter\":\"14\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:26\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u0430u043c. \",\"BookShortName\":\"1u0421u0430u043c.\",\"book\":\"8\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:25\"},{\"trans\":\"ukr_ogi\",\"BibleShortName\":\"Ukr_Ogi\",\"ref\":\"1u0421u043eu043b. 1:6\",\"BookShortName\":\"1u0421u043eu043b.\",\"book\":\"51\",\"chapter\":\"1\",\"verse\":\"6\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:22\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1:2\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":\"51\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"23:00:06\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:57\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:59:55\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u0424u0435u0441u0441. 1\",\"BookShortName\":\"1u0424u0435u0441u0441.\",\"book\":51,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:49\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u041au043eu043b. 1\",\"BookShortName\":\"u041au043eu043b.\",\"book\":50,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0424u0438u043b. 1\",\"BookShortName\":\"u0424u0438u043b.\",\"book\":49,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0415u0444. 1\",\"BookShortName\":\"u0415u0444.\",\"book\":48,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0413u0430u043b. 1\",\"BookShortName\":\"u0413u0430u043b.\",\"book\":47,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"2u041au043eu0440. 1\",\"BookShortName\":\"2u041au043eu0440.\",\"book\":46,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"1u041au043eu0440. 1\",\"BookShortName\":\"1u041au043eu0440.\",\"book\":45,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0420u0438u043c. 1\",\"BookShortName\":\"u0420u0438u043c.\",\"book\":44,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0414u0435u044fu043d. 1\",\"BookShortName\":\"u0414u0435u044fu043d.\",\"book\":43,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:59:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:58:58\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0442u0444. 5:3\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"5\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"22:58:38\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:47:53\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":\"17\",\"fecha\":\"30/12/2023\",\"hora\":\"22:47:25\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:55\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:9\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"9\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:49\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:48\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:2\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:47\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:3\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"3\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:46\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:4\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"4\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:46\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:5\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":\"1\",\"verse\":\"5\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:04:45\"},{\"trans\":\"nrt\",\"BibleShortName\":\"NRT\",\"ref\":\"u0418u043eu0430u043d. 1:1\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:02:47\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 25:19\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":\"25\",\"verse\":\"19\",\"to_verse\":null,\"fecha\":\"30/12/2023\",\"hora\":\"20:02:37\"}]', '2023-12-30 17:55:11', '2023-12-31 00:05:25'),
(3, 2, 'Juan', '[{\"trans\":\"ukr_gyz\",\"BibleShortName\":\"Ukr_Gyz\",\"ref\":\"1u041fu0435u0442u0440. 1\",\"BookShortName\":\"1u041fu0435u0442u0440.\",\"book\":59,\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"25/2/2024\",\"hora\":\"00:17:49\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0418u0435u0437. 10:2\",\"BookShortName\":\"u0418u0435u0437.\",\"book\":25,\"chapter\":\"10\",\"verse\":\"2\",\"to_verse\":null,\"fecha\":\"25/2/2024\",\"hora\":\"00:17:30\"}]', '2023-12-30 19:19:24', '2024-02-25 00:17:50');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `hist_strong`
--

INSERT INTO `hist_strong` (`id_hist_strong`, `id_user`, `username`, `arr_hist_strong`, `created_at`, `updated_at`) VALUES
(1, 3, 'SERGIO', '[{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"fecha\":\"30/12/2023\",\"hora\":\"23:31:17\"}]', '2023-12-30 23:31:19', NULL),
(3, 1, 'Sergio', '[{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H216\",\"fecha\":\"24/2/2024\",\"hora\":\"21:02:07\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H430\",\"fecha\":\"24/2/2024\",\"hora\":\"21:02:05\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H4325\",\"fecha\":\"24/2/2024\",\"hora\":\"21:02:04\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H6440\",\"fecha\":\"24/2/2024\",\"hora\":\"21:02:03\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H776\",\"fecha\":\"24/2/2024\",\"hora\":\"21:02:02\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"fecha\":\"31/12/2023\",\"hora\":\"02:13:57\"}]', '2023-12-31 02:13:58', '2024-02-24 21:02:07');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password_text`, `password`, `salt`, `email`, `created_at`, `updated_at`, `reset_token`, `reset_token_expiry`) VALUES
(1, 'Sergio', '123456', '$2y$10$TA2vJU4TW7xEtbnjp73N3uarbtUANYu/5Cn4gReTvtbWvDF9/ZQM.', '32303030', 'sergiokovalchuk@gmail.com', '2023-12-13 13:08:15', NULL, NULL, NULL),
(2, 'Juan', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'juan@gmail.com', '2023-12-18 13:08:15', NULL, NULL, NULL),
(3, 'SERGIO', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'mark@gmail.com', '2023-12-13 13:08:15', NULL, NULL, NULL),
(4, 'Lucas', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'lucas@gmail.com', '2023-12-13 13:08:15', NULL, NULL, NULL),
(5, 'user_test', '123456', '$2y$10$p6g6ja/i.JqC7b/vYI2y/OSsqfy5yDulOrFuqa0yBGNfZaZTYl9dS', '32303030', 'sergbas2001@gmail.com', '2024-01-01 23:35:06', NULL, 'a22ed7e7d81097d248020517366232069c248059683e7adc3be0cb5b83b386ce', '2024-01-02 01:10:57');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vkladki`
--

INSERT INTO `vkladki` (`id_vkladka`, `id_user`, `username`, `arrTabs`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '[{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"abi, abi, ukr_kul\",\"title\":\"ABi, ABi, Ukr_Kul\",\"btn_close\":true,\"ref_trans\":\"abi\",\"ref\":\"u0414u0435u044fu043d. 21:9\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, mdri, ukr_fil\",\"title\":\"RST+r, MDRi, Ukr_Fil\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041cu0430u0442u0444. 15:35\"},{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"ukr_ogi, ukr_ogi\",\"title\":\"Ukr_Ogi, Ukr_Ogi\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0414u0435u044fu043d. 22:19\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"abi, abi, ukr_kul\",\"title\":\"ABi, ABi, Ukr_Kul\",\"btn_close\":true,\"ref_trans\":\"abi\",\"ref\":\"u0414iu0457. 21\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_ogi\",\"title\":\"RST+r, Ukr_Ogi\",\"btn_close\":true,\"ref_trans\":\"abi\",\"ref\":\"u0418u043eu0430u043d. 4\"},{\"id\":\"tab2\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, ukr_ogi\",\"title\":\"RST+r, Ukr_Ogi\",\"btn_close\":true,\"ref_trans\":\"ukr_ogi\",\"ref\":\"u0411u0443u0442. 1:1\"},{\"id\":\"tab7\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_ogi\",\"title\":\"RST+r, Ukr_Ogi\",\"btn_close\":true,\"ref_trans\":\"ukr_ogi\",\"ref\":\"u0414iu0457. 22:19\"}]', '2023-12-18 13:13:43', '2024-03-17 02:50:11'),
(2, 2, 'Juan', '[{\"id\":\"tab10\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u0411u0443u0442. 4\"},{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u041eu0431. 1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"u042eu0434. 1\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"3Iu0432u0430u043d. 1\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"2Iu0432u0430u043d. 1\"},{\"id\":\"tab5\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"1Iu0432u0430u043d. 1\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"2u041fu0435u0442u0440. 1\"},{\"id\":\"tab7\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed, ukr_fil, ukr_gyz\",\"title\":\"RST+r, Ukr_Fil, Ukr_Gyz\",\"btn_close\":true,\"ref_trans\":\"ukr_gyz\",\"ref\":\"1u041fu0435u0442u0440. 1\"}]', '2023-12-18 13:28:53', '2024-02-25 00:17:51'),
(3, 3, 'SERGIO', '[{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref_trans\":\"nrt\",\"ref\":\"u0418u043eu0430u043d. 3:16-17\"},{\"id\":\"tab6\",\"className\":\"tabs\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref_trans\":\"nrt\",\"ref\":\"1u0424u0435u0441u0441. 1\"},{\"id\":\"tab2\",\"className\":\"tabs tab_active\",\"str_trans\":\"nrt\",\"title\":\"NRT\",\"btn_close\":true,\"ref_trans\":\"nrt\",\"ref\":\"1u0424u0435u0441u0441. 1\"}]', '2023-12-18 13:31:56', '2023-12-31 00:05:25'),
(4, 4, 'Lucas', '[{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0411u044bu0442. 1:1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0418u0441u0445. 2:2\"},{\"id\":\"tab3\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u041bu0435u0432. 3:3\"},{\"id\":\"tab4\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"undefined\",\"ref\":\"u0427u0438u0441. 4:4\"},{\"id\":\"tab5\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041bu0443u043a. 24:48\"}]', '2023-12-18 13:59:54', '2023-12-28 13:55:40'),
(5, 5, 'user_test', '[{\"id\":\"tab1\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0411u044bu0442. 1:1\"},{\"id\":\"tab2\",\"className\":\"tabs\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0411u044bu0442. 1:1\"},{\"id\":\"tab3\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u0411u044bu0442. 1:1\"}]', '2024-01-01 23:36:27', '2024-01-02 00:10:22');

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
  MODIFY `id_hist_find` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  MODIFY `id_hist_nav` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  MODIFY `id_hist_strong` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  MODIFY `id_vkladka` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
