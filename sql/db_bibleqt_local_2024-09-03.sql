-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2024 a las 14:39:21
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
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `obj_ajustes` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ajustes`
--

INSERT INTO `ajustes` (`id_ajuste`, `id_user`, `username`, `obj_ajustes`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sergio', '{\"verseCompare\":{\"wr_filter\":{\"display\":\"block\"},\"btn_lang_all\":{\"display\":\"block\",\"class\":\"tab tab_active\",\"stateActive\":true},\"one_lang\":{\"checked\":false},\"many_lang\":{\"checked\":true},\"btn_show_refs\":{\"display\":\"block\",\"classText\":\"btn btn_active\",\"stateActive\":true},\"a_ref\":{\"display\":\"inline-block\"},\"arr_lang_act\":[\"ru\"],\"arr_lang_noact\":[\"ua\",\"es\"],\"arr_trans_act\":[\"rstStrongRed\",\"opnz\",\"eg_img\"],\"arr_trans_noact\":[\"rstt\",\"rsti2\",\"rstm\",\"abi\",\"nrt\",\"mdri\",\"rsp\",\"ukr_fil\",\"ukr_ogi\",\"ukr_ogi88\",\"ukr_hom\",\"ukr_gyz\",\"ukr_tur\",\"ukr_tur2\",\"ukr_kul\",\"ukr_umts\",\"ukr_der\",\"rv60\",\"lbla\",\"ukr_pop\",\"ukr_pop2\",\"egr\"],\"aaa\":\"aaa\"},\"lang\":\"es\"}', '2024-08-19 10:23:52', '2024-09-02 18:35:37');

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
(3, 1, 'Sergio', '[{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u042f u0431u044bu043b u0432 u0434u0443u0445u0435 u0432 u0434u0435u043du044c\",\"count_verses\":1,\"count_matches\":2,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:49:15\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0418u0431u043e u0442u0430u0439u043du0430 u0431u0435u0437u0437u0430u043au043eu043du0438u044f u0443u0436u0435 u0432 u0434u0435u0439u0441u0442u0432u0438u0438, u0442u043eu043bu044cu043au043e u043du0435 u0441u043eu0432u0435u0440u0448u0438u0442u0441u044f u0434u043e u0442u0435u0445 u043fu043eu0440\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:44:22\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0418 u0435u0441u043bu0438 u043au0442u043e u0443u0441u043bu044bu0448u0438u0442 u041cu043eu0438 u0441u043bu043eu0432u0430 u0438 u043du0435\",\"count_verses\":1,\"count_matches\":3,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:40:42\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0438 u043du0438u043au0442u043e u043du0435 u043cu043eu0436u0435u0442 u043fu043eu0445u0438u0442u0438u0442u044c u0438u0445 u0438u0437 u0440u0443u043au0438 u041eu0442u0446u0430\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:34:07\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0418 u041eu043d u0438u0441u0446u0435u043bu0438u043b u043cu043du043eu0433u0438u0445, u0441u0442u0440u0430u0434u0430u0432u0448u0438u0445 u0440u0430u0437u043bu0438u0447u043du044bu043cu0438 u0431u043eu043bu0435u0437u043du044fu043cu0438; u0438u0437u0433u043du0430u043b u043cu043du043eu0433u0438u0445 u0431u0435u0441u043eu0432,\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:32:34\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0418, u0432u044bu0439u0434u044f u043fu043eu0441u043fu0435u0448u043du043e u0438u0437 u0433u0440u043eu0431u0430, u043eu043du0438 u0441u043e u0441u0442u0440u0430u0445u043eu043c u0438 u0440u0430u0434u043eu0441u0442u044cu044e u0432u0435u043bu0438u043au043eu044e u043fu043eu0431u0435u0436u0430u043bu0438 u0432u043eu0437u0432u0435u0441u0442u0438u0442u044c u0443u0447u0435u043du0438u043au0430u043c u0415u0433u043e.\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:31:34\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0418u0431u043e u0421u044bu043d u0427u0435u043bu043eu0432u0435u0447u0435u0441u043au0438u0439 u043fu0440u0438u0448u0435u043b u0432u0437u044bu0441u043au0430u0442u044c u0438 u0441u043fu0430u0441u0442u0438 u043fu043eu0433u0438u0431u0448u0435u0435.\",\"count_verses\":2,\"count_matches\":0,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:27:06\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0431u0443u0434u0443u0442 u043eu0431u043du0430u0440u0443u0436u0435u043du044b\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:15:01\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0421u0432u043eu0435u0433u043e u043fu0435u0440u0432u0435u043du0446u0430\",\"count_verses\":7,\"count_matches\":7,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:09:18\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"words\":\"u0431u0443u0434u0443u0442 u043eu0431u043du0430u0440u0443u0436u0435u043du044b\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"2/9/2024\",\"hora\":\"15:07:53\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"G3056\",\"count_verses\":315,\"count_matches\":329,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":true},\"fecha\":\"21/8/2024\",\"hora\":\"13:53:31\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u041fu0420u041eu041du0417u0418\",\"count_verses\":12,\"count_matches\":12,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"21/8/2024\",\"hora\":\"13:53:03\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0432u043eu043bu0448u0435u0431u043du0438u0446\",\"count_verses\":2,\"count_matches\":3,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"16/8/2024\",\"hora\":\"10:22:08\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0432u043eu043bu0448u0435u0431u043du0438u0446u0435\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"16/8/2024\",\"hora\":\"10:20:56\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u041fu0420u041eu041du0417u0418\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"6/8/2024\",\"hora\":\"14:58:10\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"G3056\",\"count_verses\":218,\"count_matches\":232,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":true},\"fecha\":\"1/4/2024\",\"hora\":\"18:07:42\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"1/4/2024\",\"hora\":\"18:07:32\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"G3056\",\"count_verses\":159,\"count_matches\":168,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":true},\"fecha\":\"1/4/2024\",\"hora\":\"17:47:45\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"G3004\",\"count_verses\":1243,\"count_matches\":1342,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":true},\"fecha\":\"19/3/2024\",\"hora\":\"18:10:12\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u043eu043c. u0418 u0431u044bu043b u0432u0435u0447u0435u0440, u0438 u0431u044bu043bu043e\",\"count_verses\":1,\"count_matches\":0,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"19/3/2024\",\"hora\":\"18:09:04\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0435u043cu043bu044f u0436u0435 u0431u044bu043bu0430 u0431u0435u0437u0432\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"19/3/2024\",\"hora\":\"18:08:49\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"words\":\"u0412 u043du0430u0447u0430u043bu0435 u0441u043eu0442u0432u043eu0440u0438u043b u0411u043eu0433 u043du0435u0431u043e u0438 u0437u0435u043cu043bu044e\",\"count_verses\":1,\"count_matches\":1,\"params\":{\"gde_val\":\"TB\",\"limit_val\":\"50\",\"cbox1_checked\":false,\"cbox2_checked\":false,\"cbox3_checked\":false,\"cbox4_checked\":false,\"cbox5_checked\":false,\"cbox6_checked\":false,\"cbox7_checked\":false},\"fecha\":\"19/3/2024\",\"hora\":\"18:08:29\"}]', '2024-03-19 18:08:29', '2024-09-02 15:49:15');

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
(1, 1, 'Sergio', '[{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041eu0442u043au0440. 1:1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":65,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:45:20\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041eu0442u043au0440. 1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:31:42\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041eu0442u043au0440. 2\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":2,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:23:34\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041eu0442u043au0440. 1:1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":65,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:19:27\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041eu0442u043au0440. 1:1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":65,\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:18:35\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041eu0442u043au0440. 1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":65,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:17:51\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u0443u0434. 1\",\"BookShortName\":\"u0418u0443u0434.\",\"book\":64,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:17:27\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u0418u0443u0434. 1\",\"BookShortName\":\"u0418u0443u0434.\",\"book\":64,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:10:52\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"3u0418u043eu0430u043d. 1\",\"BookShortName\":\"3u0418u043eu0430u043d.\",\"book\":63,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:10:50\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u0418u0443u0434. 1\",\"BookShortName\":\"u0418u0443u0434.\",\"book\":64,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:10:49\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u041eu0442u043au0440. 1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":65,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:10:47\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u0411u044bu0442. 1\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:10:43\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u041eu0442u043au0440. 1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:10:03\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u041eu0442u043au0440. 2\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":2,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:09:56\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u041eu0442u043au0440. 1:1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":\"1\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:09:50\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u041eu0442u043au0440. 1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":\"1\",\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:09:48\"},{\"trans\":\"eg_img\",\"BibleShortName\":\"EG_IMG\",\"ref\":\"u041eu0442u043au0440. \",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"16:09:47\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041eu0442u043au0440. 1\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:52:04\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041eu0442u043au0440. 2\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":\"65\",\"chapter\":2,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:51:47\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041eu0442u043au0440. 1:10\",\"BookShortName\":\"u041eu0442u043au0440.\",\"book\":65,\"chapter\":\"1\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:49:16\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"1u0422u0438u043c. 3:16\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":\"53\",\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:47:37\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"1u0422u0438u043c. 3\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":\"53\",\"chapter\":\"3\",\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:47:36\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"1u0422u0438u043c. 1\",\"BookShortName\":\"1u0422u0438u043c.\",\"book\":53,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:47:34\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u0422u0438u043c. 3:16\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":\"54\",\"chapter\":\"3\",\"verse\":\"16\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:47:28\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u0422u0438u043c. 3\",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":\"54\",\"chapter\":\"3\",\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:47:27\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u0422u0438u043c. \",\"BookShortName\":\"2u0422u0438u043c.\",\"book\":\"54\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:47:26\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u0424u0435u0441u0441. 2:7\",\"BookShortName\":\"2u0424u0435u0441u0441.\",\"book\":52,\"chapter\":\"2\",\"verse\":\"7\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:44:23\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 12:47\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"12\",\"verse\":\"47\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:40:43\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 10:29\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"10\",\"verse\":\"29\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:36:27\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 10\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":10,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:36:23\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 11\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":11,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:36:21\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 10:29\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"10\",\"verse\":\"29\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:35:05\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 10\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":10,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:35:03\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 11\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":\"42\",\"chapter\":11,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:35:02\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0418u043eu0430u043d. 10:29\",\"BookShortName\":\"u0418u043eu0430u043d.\",\"book\":42,\"chapter\":\"10\",\"verse\":\"29\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:34:08\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u041cu0430u0440. 1:34\",\"BookShortName\":\"u041cu0430u0440.\",\"book\":40,\"chapter\":\"1\",\"verse\":\"34\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:32:35\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041cu0430u0442u0444. 28:8\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"28\",\"verse\":\"8\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:31:35\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041cu0430u0442u0444. 18:11\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"18\",\"verse\":\"11\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:27:10\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u041fu0435u0442. 3:10\",\"BookShortName\":\"2u041fu0435u0442.\",\"book\":60,\"chapter\":\"3\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:22:04\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0411u044bu0442. 3\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":3,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:18:34\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0411u044bu0442. 2\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":2,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:18:32\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u0411u044bu0442. \",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"\",\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:18:29\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u041fu0435u0442. 3:10\",\"BookShortName\":\"2u041fu0435u0442.\",\"book\":60,\"chapter\":\"3\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:15:31\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"u041cu0430u0442u0444. 1:25\",\"BookShortName\":\"u041cu0430u0442u0444.\",\"book\":39,\"chapter\":\"1\",\"verse\":\"25\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:09:31\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u041fu0435u0442. 3\",\"BookShortName\":\"2u041fu0435u0442.\",\"book\":60,\"chapter\":3,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:08:04\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"1u0418u043eu0430u043d. 1\",\"BookShortName\":\"1u0418u043eu0430u043d.\",\"book\":61,\"chapter\":1,\"verse\":null,\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:08:03\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u041fu0435u0442. 3:10\",\"BookShortName\":\"2u041fu0435u0442.\",\"book\":60,\"chapter\":\"3\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:07:54\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 8:1\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":0,\"chapter\":\"8\",\"verse\":\"1\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:07:36\"},{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u041fu0435u0442. 3:10\",\"BookShortName\":\"2u041fu0435u0442.\",\"book\":60,\"chapter\":\"3\",\"verse\":\"10\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:07:13\"}]', '2023-12-30 17:53:51', '2024-09-02 16:45:20');

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
(3, 1, 'Sergio', '[{\"strongLang\":\"Greek\",\"strongIndex\":\"G189\",\"strongWord\":\"<el>u1f00u03bau03bfu03ae</el>\",\"strongTranslation\":\"1. u0441u043bu0443u0445 (u0447u0443u0432u0441u0442u0432u043e); <br/>2. u0443u0445u043e; <br/>3. u0441u043bu044bu0448u0430u043du0438u0435; <br/>4. u043cu043eu043bu0432u0430, u0441u043bu0443u0445u0438, u0432u0435u0441u0442u044c; \",\"fecha\":\"21/8/2024\",\"hora\":\"14:11:52\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G2316\",\"strongWord\":\"<el>u03b8u03b5u03ccu03c2</el>\",\"strongTranslation\":\"u0411u043eu0433, u0431u043eu0433; \",\"fecha\":\"21/8/2024\",\"hora\":\"14:11:35\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G4487\",\"strongWord\":\"<el>u1fe5u1fc6u03bcu03b1</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0444u0440u0430u0437u0430, u0440u0435u0447u044c; \",\"fecha\":\"21/8/2024\",\"hora\":\"14:11:14\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"strongWord\":\"<el>u03bbu03ccu03b3u03bfu03c2</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0432u044bu0440u0430u0436u0435u043du0438u0435, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0434u0435u043bu043e, u0440u0435u0447u044c, u0440u0430u0441u0441u043au0430u0437, u043cu043eu043bu0432u0430, u0441u043bu0443u0445; \",\"fecha\":\"21/8/2024\",\"hora\":\"13:53:28\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G5316\",\"strongWord\":\"<el>u03c6u03b1u03afu03bdu03c9</el>\",\"strongTranslation\":\"1. u0441u0432u0435u0442u0438u0442u044c, u0441u0438u044fu0442u044c; <br/>2. u044fu0432u043bu044fu0442u044cu0441u044f, u043fu043eu043au0430u0437u044bu0432u0430u0442u044cu0441u044f; <br/>3. u043au0430u0437u0430u0442u044cu0441u044f, u043fu0440u0435u0434u0441u0442u0430u0432u043bu044fu0442u044cu0441u044f; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:49:16\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G5456\",\"strongWord\":\"<el>u03c6u03c9u03bdu03ae</el>\",\"strongTranslation\":\"u0437u0432u0443u043a, u0448u0443u043c, u0433u043eu043bu043eu0441, u043au0440u0438u043a, u0432u043eu043fu043bu044c, u0441u0442u0443u043a; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:48:56\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"strongWord\":\"<el>u03bbu03ccu03b3u03bfu03c2</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0432u044bu0440u0430u0436u0435u043du0438u0435, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0434u0435u043bu043e, u0440u0435u0447u044c, u0440u0430u0441u0441u043au0430u0437, u043cu043eu043bu0432u0430, u0441u043bu0443u0445; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:48:51\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G4487\",\"strongWord\":\"<el>u1fe5u1fc6u03bcu03b1</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0444u0440u0430u0437u0430, u0440u0435u0447u044c; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:48:38\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"strongWord\":\"<el>u03bbu03ccu03b3u03bfu03c2</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0432u044bu0440u0430u0436u0435u043du0438u0435, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0434u0435u043bu043e, u0440u0435u0447u044c, u0440u0430u0441u0441u043au0430u0437, u043cu043eu043bu0432u0430, u0441u043bu0443u0445; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:48:36\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3454\",\"strongWord\":\"<el>u03bcu1fe6u03b8u03bfu03c2</el>\",\"strongTranslation\":\"u0431u0430u0441u043du044f, u0441u043au0430u0437u043au0430, u043cu0438u0444, u0432u044bu0434u0443u043cu043au0430, u0441u043bu0443u0445u0438; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:48:29\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"strongWord\":\"<el>u03bbu03ccu03b3u03bfu03c2</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0432u044bu0440u0430u0436u0435u043du0438u0435, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0434u0435u043bu043e, u0440u0435u0447u044c, u0440u0430u0441u0441u043au0430u0437, u043cu043eu043bu0432u0430, u0441u043bu0443u0445; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:48:25\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3004\",\"strongWord\":\"<el>u03bbu03adu03b3u03c9</el>\",\"strongTranslation\":\"u0433u043eu0432u043eu0440u0438u0442u044c, u0441u043au0430u0437u0430u0442u044c, u0441u043eu043eu0431u0449u0430u0442u044c, u0440u0430u0441u0441u043au0430u0437u044bu0432u0430u0442u044c. \",\"fecha\":\"16/8/2024\",\"hora\":\"10:48:14\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"strongWord\":\"<el>u03bbu03ccu03b3u03bfu03c2</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0432u044bu0440u0430u0436u0435u043du0438u0435, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0434u0435u043bu043e, u0440u0435u0447u044c, u0440u0430u0441u0441u043au0430u0437, u043cu043eu043bu0432u0430, u0441u043bu0443u0445; \",\"fecha\":\"16/8/2024\",\"hora\":\"10:46:36\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G4314\",\"strongWord\":\"<el>u03c0u03c1u03ccu03c2</el>\",\"strongTranslation\":\"1. u0441 <i>u0440. u043f. </i>: u0441u043e u0441u0442u043eu0440u043eu043du044b, u043fu043e u043eu0442u043du043eu0448u0435u043du0438u044e u043a, u043fu0440u0438u043cu0435u043du0438u0442u0435u043bu044cu043du043e u043a, u0432 u043fu043eu043bu044cu0437u0443; <br/>2. u0441 <i>u0434. u043f. </i>: u0443, u043fu0440u0438, u0432u043eu0437u043bu0435, u043eu043au043eu043bu043e; <br/>3. u0441 <i>u0432. u043f. </i>: u043a, u043fu043e u043du0430u043fu0440u0430u0432u043bu0435u043du0438u044e u043a, u0432, u043du0430; <i>u043fu0440u0438u0441u0442.</i> u0441u043e u0437u043du0430u0447.: u0430. u043du0430u043fu0440u0430u0432u043bu0435u043du0438u044f; u0431. u0434u043eu0431u0430u0432u043bu0435u043du0438u044f; u0432. u0441u043cu0435u0436u043du043eu0441u0442u0438 u0438u043bu0438 u0431u043bu0438u0437u043eu0441u0442u0438. \",\"fecha\":\"13/8/2024\",\"hora\":\"09:51:54\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G2316\",\"strongWord\":\"<el>u03b8u03b5u03ccu03c2</el>\",\"strongTranslation\":\"u0411u043eu0433, u0431u043eu0433; \",\"fecha\":\"13/8/2024\",\"hora\":\"09:51:46\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G746\",\"strongWord\":\"<el>u1f00u03c1u03c7u03ae</el>\",\"strongTranslation\":\"1. u043du0430u0447u0430u043bu043e, u043eu0441u043du043eu0432u0430u043du0438u0435, u043fu0440u043eu0438u0441u0445u043eu0436u0434u0435u043du0438u0435; <br/>2. u043du0430u0447u0430u043bu044cu0441u0442u0432u043e, u0433u043eu0441u043fu043eu0434u0441u0442u0432u043e; <br/>3. u0443u0433u043eu043b, u043au0440u0430u0439, u043au043eu043du0435u0446. \",\"fecha\":\"13/8/2024\",\"hora\":\"09:51:10\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3588\",\"strongWord\":\"<el>u1f41</el>\",\"strongTranslation\":\"1. <i>u0443u043au0430u0437. u043cu0435u0441u0442. </i>: u0441u0435u0439, u044du0442u043eu0442, u0442u043eu0442; <br/>2. u043eu043fu0440u0435u0434u0435u043bu0435u043du043du044bu0439 u0430u0440u0442u0438u043au043bu044c, u043au0430u043a u0430u043du0433u043b. the u0438u043bu0438 u043du0435u043c. der, die, das, u0447u0430u0441u0442u043e u043du0435u043fu0435u0440u0435u0432u043eu0434u044fu0449u0435u0435u0441u044f u0432 u0440u0443u0441. u044fu0437u044bu043au0435; u0442u0430u043au0436u0435 u0443u043fu043eu0442u0440. u0432 u043au0430u0447u0435u0441u0442u0432u0435 <i>u043eu0442u043d. u043cu0435u0441u0442. </i>: u043au0442u043e, u0447u0442u043e, u043au043eu0442u043eu0440u044bu0439, u0441u0435u0439, u0442u043eu0442, u044du0442u043eu0442. \",\"fecha\":\"13/8/2024\",\"hora\":\"09:51:09\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"strongWord\":\"<el>u03bbu03ccu03b3u03bfu03c2</el>\",\"strongTranslation\":\"u0441u043bu043eu0432u043e, u0432u044bu0440u0430u0436u0435u043du0438u0435, u0438u0437u0440u0435u0447u0435u043du0438u0435, u0434u0435u043bu043e, u0440u0435u0447u044c, u0440u0430u0441u0441u043au0430u0437, u043cu043eu043bu0432u0430, u0441u043bu0443u0445; \",\"fecha\":\"13/8/2024\",\"hora\":\"09:51:07\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3588\",\"strongWord\":\"<el>u1f41</el>\",\"strongTranslation\":\"1. <i>u0443u043au0430u0437. u043cu0435u0441u0442. </i>: u0441u0435u0439, u044du0442u043eu0442, u0442u043eu0442; <br/>2. u043eu043fu0440u0435u0434u0435u043bu0435u043du043du044bu0439 u0430u0440u0442u0438u043au043bu044c, u043au0430u043a u0430u043du0433u043b. the u0438u043bu0438 u043du0435u043c. der, die, das, u0447u0430u0441u0442u043e u043du0435u043fu0435u0440u0435u0432u043eu0434u044fu0449u0435u0435u0441u044f u0432 u0440u0443u0441. u044fu0437u044bu043au0435; u0442u0430u043au0436u0435 u0443u043fu043eu0442u0440. u0432 u043au0430u0447u0435u0441u0442u0432u0435 <i>u043eu0442u043d. u043cu0435u0441u0442. </i>: u043au0442u043e, u0447u0442u043e, u043au043eu0442u043eu0440u044bu0439, u0441u0435u0439, u0442u043eu0442, u044du0442u043eu0442. \",\"fecha\":\"13/8/2024\",\"hora\":\"09:51:03\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G5037\",\"strongWord\":\"<el>u03c4u03ad</el>\",\"strongTranslation\":\"u0438, u0434u0430, u0436u0435, u043bu0438. \",\"fecha\":\"13/8/2024\",\"hora\":\"09:49:15\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G2919\",\"strongWord\":\"<el>u03bau03c1u03afu03bdu03c9</el>\",\"strongTranslation\":\"1. u043eu0442u0434u0435u043bu044fu0442u044c, u0432u044bu0431u0438u0440u0430u0442u044c; <br/>2. u0440u0430u0441u0441u0443u0436u0434u0430u0442u044c, u043fu043eu043bu0430u0433u0430u0442u044c; <br/>3. u0440u0435u0448u0430u0442u044c, u0434u0435u043bu0430u0442u044c u0432u044bu0432u043eu0434, u043fu0440u0438u0432u043eu0434u0438u0442u044c u043a u0437u0430u043au043bu044eu0447u0435u043du0438u044e; <br/>4. u0441u0443u0434u0438u0442u044c, u043fu0440u043eu0438u0437u0432u043eu0434u0438u0442u044c u0441u0443u0434, u043eu0441u0443u0436u0434u0430u0442u044c, u043eu0431u0432u0438u043du044fu0442u044c; \",\"fecha\":\"13/8/2024\",\"hora\":\"09:49:14\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G4632\",\"fecha\":\"9/8/2024\",\"hora\":\"16:30:28\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G1252\",\"fecha\":\"6/8/2024\",\"hora\":\"14:17:03\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G2532\",\"fecha\":\"6/8/2024\",\"hora\":\"14:16:58\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H4881\",\"fecha\":\"5/8/2024\",\"hora\":\"15:08:17\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H216\",\"fecha\":\"5/8/2024\",\"hora\":\"15:07:58\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H3470\",\"fecha\":\"5/8/2024\",\"hora\":\"15:04:15\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H7725\",\"fecha\":\"5/8/2024\",\"hora\":\"15:03:56\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G2699\",\"fecha\":\"11/7/2024\",\"hora\":\"15:07:47\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3362\",\"fecha\":\"11/7/2024\",\"hora\":\"14:06:49\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G281\",\"fecha\":\"11/7/2024\",\"hora\":\"14:06:42\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G1080\",\"fecha\":\"11/7/2024\",\"hora\":\"14:06:38\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3762\",\"fecha\":\"11/7/2024\",\"hora\":\"14:06:36\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3588\",\"fecha\":\"11/7/2024\",\"hora\":\"14:06:02\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G4314\",\"fecha\":\"11/7/2024\",\"hora\":\"14:05:57\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G1437\",\"fecha\":\"11/7/2024\",\"hora\":\"13:56:59\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3588\",\"fecha\":\"11/7/2024\",\"hora\":\"13:56:34\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3754\",\"fecha\":\"11/7/2024\",\"hora\":\"13:51:51\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3530\",\"fecha\":\"11/7/2024\",\"hora\":\"13:51:37\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"fecha\":\"1/4/2024\",\"hora\":\"18:03:00\"},{\"strongLang\":\"Hebrew\",\"strongIndex\":\"H7682\",\"fecha\":\"19/3/2024\",\"hora\":\"18:11:39\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3004\",\"fecha\":\"19/3/2024\",\"hora\":\"18:09:55\"},{\"strongLang\":\"Greek\",\"strongIndex\":\"G3056\",\"fecha\":\"19/3/2024\",\"hora\":\"18:09:52\"}]', '2024-03-19 18:09:52', '2024-08-21 14:11:52');

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
(1, 1, 'Sergio', '[{\"trans\":\"rsti2\",\"BibleShortName\":\"RSTi2*\",\"ref\":\"2u041fu0435u0442. 3:10\",\"BookShortName\":\"2u041fu0435u0442.\",\"book\":\"60\",\"chapter\":\"3\",\"verse\":\"10\",\"verseText\":\"u041fu0440u0438u0434u0435u0442 u0436u0435 u0434u0435u043du044c u0413u043eu0441u043fu043eu0434u0435u043du044c, u043au0430u043a u0442u0430u0442u044c u043du043eu0447u044cu044e, u0438 u0442u043eu0433u0434u0430 u043du0435u0431u0435u0441u0430 u0441 u0448u0443u043cu043eu043c u043fu0440u0435u0439u0434u0443u0442, u0441u0442u0438u0445u0438u0438 u0436u0435, u0440u0430u0437u0433u043eu0440u0435u0432u0448u0438u0441u044c, u0440u0430u0437u0440u0443u0448u0430u0442u0441u044f, u0437u0435u043cu043bu044f u0438 u0432u0441u0435 u0434u0435u043bu0430 u043du0430 u043du0435u0439 \n\n\n\n | \n u0431u0443u0434u0443u0442 u043eu0431u043du0430u0440u0443u0436u0435u043du044b \n | \n u0441u0433u043eu0440u044fu0442\n | .\",\"to_verse\":null,\"fecha\":\"2/9/2024\",\"hora\":\"15:18:26\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 8:3\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"8\",\"verse\":\"3\",\"verseText\":\"u0412u043eu0434u0430  u0436u0435 u043fu043eu0441u0442u0435u043fu0435u043du043du043e   u0432u043eu0437u0432u0440u0430u0449u0430u043bu0430u0441u044c  u0441 u0437u0435u043cu043bu0438,  u0438 u0441u0442u0430u043bu0430  u0443u0431u044bu0432u0430u0442u044c  u0432u043eu0434u0430  u043fu043e u043eu043au043eu043du0447u0430u043du0438u0438  u0441u0442u0430  u043fu044fu0442u0438u0434u0435u0441u044fu0442u0438  u0434u043du0435u0439.\",\"to_verse\":null,\"fecha\":\"29/8/2024\",\"hora\":\"15:35:50\"},{\"trans\":\"rstStrongRed\",\"BibleShortName\":\"RST+r\",\"ref\":\"u0411u044bu0442. 3:3\",\"BookShortName\":\"u0411u044bu0442.\",\"book\":\"0\",\"chapter\":\"3\",\"verse\":\"3\",\"verseText\":\"u0442u043eu043bu044cu043au043e u043fu043bu043eu0434u043eu0432  u0434u0435u0440u0435u0432u0430,  u043au043eu0442u043eu0440u043eu0435 u0441u0440u0435u0434u0438  u0440u0430u044f,  u0441u043au0430u0437u0430u043b  u0411u043eu0433,  u043du0435 u0435u0448u044cu0442u0435  u0438u0445 u0438 u043du0435 u043fu0440u0438u043au0430u0441u0430u0439u0442u0435u0441u044c  u043a u043du0438u043c, u0447u0442u043eu0431u044b  u0432u0430u043c u043du0435  u0443u043cu0435u0440u0435u0442u044c.\",\"to_verse\":null,\"fecha\":\"29/8/2024\",\"hora\":\"15:34:00\"}]', '2023-12-30 17:53:51', '2024-09-02 15:18:26');

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
  `is_email_verified` tinyint(1) DEFAULT 0,
  `email_token` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password_text`, `password`, `salt`, `email`, `is_email_verified`, `email_token`, `last_login`, `created_at`, `updated_at`, `reset_token`, `reset_token_expiry`) VALUES
(1, 'Sergio', '999999', '$2y$10$IAVp3XTOWSoiLlezc88JBu.HBB06FZfEApgZaTVUKnObcq37EIPUC', '32303030', 'sergiokovalchuk@gmail.com', 1, NULL, '2024-09-02 15:07:36', '2023-12-13 13:08:15', NULL, NULL, NULL),
(2, 'Juan', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'juan@gmail.com', 0, NULL, NULL, '2023-12-18 13:08:15', NULL, NULL, NULL),
(3, 'SERGIO', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'mark@gmail.com', 0, NULL, NULL, '2023-12-13 13:08:15', NULL, NULL, NULL),
(4, 'Lucas', '123123', '$2y$10$pc6Ob0U8USc2EBE5wI32R.HjSLObySLsmTfoMtmprzFyiamlSL.a6', '32303030', 'lucas@gmail.com', 0, NULL, NULL, '2023-12-13 13:08:15', NULL, NULL, NULL),
(5, 'test_user_no_borrar', '123456', '$2y$10$Nd1fTDnhFGuNEpGx2f2wtecmaIsMgIl4z62aI90PUVwSsGOmvQmc2', '32303030', 'test1@gmail.com', 0, NULL, NULL, '2024-03-19 18:16:43', NULL, NULL, NULL),
(6, 'test1', '111111', '$2y$10$9yjF0ySMsJSx2/h0v.WdOOAl6NqgDmmdQfonY4rRNaVzG8zf2Gl..', '32303030', 'test1@test.com', 0, NULL, NULL, '2024-08-28 11:51:32', NULL, NULL, NULL),
(7, 'nombre1', '987987', '$2y$10$psv.x16RxLIwh5aSjvoPdebcOYHfsfStX6Uip4EuZK0KUwPNRtake', '32303030', 'nombre1@test.com', 0, NULL, '2024-08-30 14:40:08', '2024-08-30 14:33:34', '2024-08-30 14:39:21', NULL, NULL),
(8, 'nombre2', '123123', '$2y$10$Q2kxoCfMp0KzABx93OuAt.SvHN3uG94vYIqOCfxlm5nzoCx74NB9C', '32303030', 'nombre2@test.com', 0, NULL, '2024-08-30 14:53:01', '2024-08-30 14:40:53', NULL, NULL, NULL),
(9, 'nombre3', '123123', '$2y$10$EhAMu0EqGSrGrD.fPUarTuLy7O2s08aqmnxQrSSErHJN3tyqNzLJ2', '32303030', 'nombre3@test.com', 0, NULL, NULL, '2024-09-02 18:36:26', NULL, NULL, NULL),
(10, 'qwer', '123123', '$2y$10$xsfRpriAZlFXxq9SqPxVJuFgOMKceCQMP.4s266fSIZRI9/3/Y2BW', '32303030', 'qwr@qwe.qwe', 0, NULL, NULL, '2024-09-03 11:31:00', NULL, NULL, NULL),
(11, 'qewrqwer', '123123', '$2y$10$O4d2bQ1yKR1NNEZP93SsqeRAdDP1wgDguOVwm6gEeB0QfTqbP/JjG', '32303030', 'qwer@qwe.ert22222', 0, NULL, NULL, '2024-09-03 11:37:22', NULL, NULL, NULL),
(13, 'qewrqwer', '123123', '$2y$10$O4d2bQ1yKR1NNEZP93SsqeRAdDP1wgDguOVwm6gEeB0QfTqbP/JjG', '32303030', 'qwer@qwe.ert', 0, NULL, NULL, '2024-09-03 11:37:22', NULL, NULL, NULL),
(14, 'n1', '123123', '$2y$10$Allk87UZjCTqH3RraeW5.O3u0o27bOSF/LUeNL/.8pwRm9tFmD9mK', '32303030', 'n1@test.com', 0, NULL, NULL, '2024-09-03 11:47:06', NULL, NULL, NULL),
(15, 'n3', '123123', '$2y$10$xqH3TD91VC/qG.5XzOxGouVYeKsBeHXtvVqueoLQ3Im7b1LD0S52y', '32303030', 'n3@test.com', 0, NULL, NULL, '2024-09-03 11:49:36', NULL, NULL, NULL),
(16, 'n4', '123123', '$2y$10$GgqqlPCP373gDWWNPE5ZsuxTlzyJPihz4xUiHdE3V5i4gV3u2b3FG', '32303030', 'n4@test.com', 0, NULL, NULL, '2024-09-03 11:50:42', NULL, NULL, NULL),
(17, 'n6', '123123', '$2y$10$HMb7a53fnQLYPguObr1CeO4fFq1CvIm7DPRAS8Yu5/A2a26jet7nu', '32303030', 'n6@test.com', 0, 'c3e5fba721a7989888874ee16c84a050', NULL, '2024-09-03 11:59:30', NULL, NULL, NULL),
(18, 'N7', '123123', '$2y$10$Xk0sRmWgXNdGRmz1Pwe24eX6xQZvntXIRif42E.DEJVMulGDDZmqS', '32303030', 'n7@test.com', 0, '7d3ae4242840eac23c33e04e66de9f8b', NULL, '2024-09-03 12:09:37', NULL, NULL, NULL),
(19, 'n8', '123123', '$2y$10$UUcUCNr6BtOsP.kuO7RsVuHuoM/vi9DaLuD6/xl94lZq6nkHP4RhO', '32303030', 'n8@test.com', 0, '4ba85f64bad8b5afb5bb1c33b1be9b24', NULL, '2024-09-03 12:16:29', NULL, NULL, NULL),
(20, 'n9', '123123', '$2y$10$Th0CgJfY3Ee0.VLbytI0YuVGz/liUL4IxjQHAN5oeLQUDVAGcz04e', '32303030', 'n9@test.com', 0, '2d2d433b70f39ad9843e16809ec03d87', NULL, '2024-09-03 12:18:01', NULL, NULL, NULL),
(21, 'n10', '123123', '$2y$10$DL/kTQxymXklSxKGJLsXiOXINA/sU.7gaz3P9IdZuOVWmBf0eNtbm', '32303030', 'n10@test.com', 0, '66d94befd96fb96f642e0d3020b8b51f', NULL, '2024-09-03 13:00:21', NULL, NULL, NULL),
(22, 'n11', '123123', '$2y$10$iEfeuVEUWXtsE08WR8jZIOhtq/jsfAViUczJeJ2vr03exgjloVIhm', '32303030', 'n11@test.com', 0, '4c5007843507ce137df8de563d27cd28', NULL, '2024-09-03 13:02:46', NULL, NULL, NULL),
(23, 'n12', '123123', '$2y$10$im6cTrcDXwuHrZqttmmwkug2PMJrlIWdi8wmc9m0yd3z.ddDVFYwK', '32303030', 'n12@test.com', 0, '9046c0880e64f7f1da4be93b450abbca', NULL, '2024-09-03 13:04:51', NULL, NULL, NULL),
(24, 'n13', '123123', '$2y$10$6w5Tw6sfIVeeDMS3WGB.ZuE/Q6kkNuYoZEBKAGjegoyjx.T9QyFDm', '32303030', 'n13@test.com', 0, '0ade81283b8b1946de6992bcc68a1f0b', NULL, '2024-09-03 13:08:31', NULL, NULL, NULL),
(25, 'n14', '123123', '$2y$10$bgX7Xzctoz006GJwVbSZYu37vH8muTRQ5G11W.M9zZXFk8mBLdlMO', '32303030', 'n14@test.com', 0, '150bfc15c0c891aa42ddab800d58fb55cc3ce420ec25b7e54083d558655e0e54', NULL, '2024-09-03 13:18:29', NULL, NULL, NULL),
(26, 'n15', '123123', '$2y$10$uDzgRY3drcIVvbrzaV0mretztMvvXQKIcZbDh5gPgS/lY7stjIRpe', '32303030', 'n15@test.com', 1, NULL, NULL, '2024-09-03 13:50:23', NULL, NULL, NULL),
(27, 'n16', '123123', '$2y$10$Z8Krm4Xj/wnZB3LPtvTisus.2LlAWYl.3MAiEyP6hizh5FnioTEs6', '32303030', 'n16@test.com', 0, '60c54861566d0383df7873d675bd2d5928677a4dfe52b5642c9b3d5751d83cbb', NULL, '2024-09-03 14:25:04', NULL, NULL, NULL),
(28, 'n17', '123123', '$2y$10$HS7r.iu5XQl5V0V6rlzwZOUWRB5LYFnce.kzhyEIiXwhc7iffW4by', '32303030', 'n17@test.com', 0, '4beba4543d5684e3ba9868345c4f13039681d7ac0ee086cf4bcadace0d47b3a5', NULL, '2024-09-03 14:37:14', NULL, NULL, NULL);

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
(1, 1, 'Sergio', '[{\"id\":\"tab1\",\"className\":\"tabs tab_active\",\"str_trans\":\"rstStrongRed\",\"title\":\"RST+r\",\"btn_close\":true,\"ref_trans\":\"rstStrongRed\",\"ref\":\"u041eu0442u043au0440. 1:1\"}]', '2023-12-18 13:13:43', '2024-09-02 18:35:37');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD PRIMARY KEY (`id_ajuste`);

--
-- Indices de la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  ADD PRIMARY KEY (`id_fav_trans`);

--
-- Indices de la tabla `hist_find`
--
ALTER TABLE `hist_find`
  ADD PRIMARY KEY (`id_hist_find`);

--
-- Indices de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  ADD PRIMARY KEY (`id_hist_nav`);

--
-- Indices de la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  ADD PRIMARY KEY (`id_hist_strong`);

--
-- Indices de la tabla `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id_marker`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD PRIMARY KEY (`id_vkladka`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  MODIFY `id_ajuste` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  MODIFY `id_fav_trans` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `hist_find`
--
ALTER TABLE `hist_find`
  MODIFY `id_hist_find` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  MODIFY `id_hist_nav` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  MODIFY `id_hist_strong` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `markers`
--
ALTER TABLE `markers`
  MODIFY `id_marker` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `vkladki`
--
ALTER TABLE `vkladki`
  MODIFY `id_vkladka` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD CONSTRAINT `fk_ajustes_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `fav_trans`
--
ALTER TABLE `fav_trans`
  ADD CONSTRAINT `fk_fav_trans_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `hist_find`
--
ALTER TABLE `hist_find`
  ADD CONSTRAINT `fk_hist_find_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `hist_nav`
--
ALTER TABLE `hist_nav`
  ADD CONSTRAINT `fk_hist_nav_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `hist_strong`
--
ALTER TABLE `hist_strong`
  ADD CONSTRAINT `fk_hist_strong_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `markers`
--
ALTER TABLE `markers`
  ADD CONSTRAINT `fk_markers_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `vkladki`
--
ALTER TABLE `vkladki`
  ADD CONSTRAINT `fk_vkladki_to_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
