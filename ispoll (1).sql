-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2021 a las 03:13:42
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ispoll`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `id_types`
--

CREATE TABLE `id_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `id_types`
--

INSERT INTO `id_types` (`id`, `type_name`, `created_at`, `updated_at`) VALUES
(1, 'Cartão do Cidadão', '2021-05-02 14:47:15', '2021-05-02 14:47:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `polls`
--

CREATE TABLE `polls` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `poll_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `poll_desc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `polls`
--

INSERT INTO `polls` (`id`, `poll_name`, `poll_desc`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Eleicoes 2022', 'Eleicoes para presidente da republica 2022', 1, '2021-05-02 19:48:48', '2021-10-11 04:33:00'),
(14, 'Favorite Color', 'Choose favorite color', 0, '2021-05-03 16:35:48', '2021-10-12 17:16:36'),
(25, 'Melhor equipa', 'Escolher melhor equipa', 1, '2021-10-12 16:59:49', '2021-10-12 16:59:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `poll_options`
--

CREATE TABLE `poll_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `poll_id` bigint(20) UNSIGNED DEFAULT NULL,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `poll_options`
--

INSERT INTO `poll_options` (`id`, `poll_id`, `option_name`, `option_description`, `created_at`, `updated_at`) VALUES
(1, 2, 'John Snow', 'Lorem ipsum ', '2021-05-02 21:10:08', '2021-06-04 01:03:21'),
(20, 2, 'option 2', 'asd asd', '2021-06-04 01:04:29', '2021-06-04 01:04:29'),
(6, 2, 'Option 3', 'asd asd ', '2021-05-02 23:53:23', '2021-06-04 01:03:37'),
(7, 1, 'Option 1', 'this is the first option', '2021-05-03 13:18:55', '2021-10-11 16:49:30'),
(8, 1, 'Option 2', 'asdasdasd', '2021-05-03 13:19:08', '2021-05-03 13:19:08'),
(9, 1, 'Option 3', 'asd asdasda sdasdas', '2021-05-03 13:19:17', '2021-05-03 13:19:17'),
(10, 1, 'Option 4', 'asda sdasd asd', '2021-05-03 13:19:31', '2021-05-03 13:19:31'),
(11, 14, 'Blue', 'asda sdasdas', '2021-05-03 16:36:03', '2021-05-03 16:36:03'),
(12, 14, 'Red', 'asdasd', '2021-05-03 16:36:17', '2021-05-03 16:36:17'),
(13, 14, 'Green', 'asda sdasd', '2021-05-03 16:36:23', '2021-05-03 16:36:27'),
(14, 14, 'Black', 'asda sdas', '2021-05-03 16:36:38', '2021-05-03 16:36:38'),
(16, 13, 'uno', '', '2021-05-28 01:07:29', '2021-05-28 01:07:29'),
(17, 15, 'teste', 'teste', '2021-05-28 13:42:51', '2021-05-28 13:42:51'),
(18, 19, 'hola', 'ah', '2021-06-03 19:13:43', '2021-06-03 19:13:43'),
(22, 23, 'uno', '1', '2021-06-04 02:55:17', '2021-06-04 02:55:17'),
(24, 25, 'Benfica', 'Primeira Liga', '2021-10-12 17:00:50', '2021-10-12 17:00:50'),
(25, 25, 'Porto', 'Primeira Liga', '2021-10-12 17:17:31', '2021-10-12 17:17:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 1, '2021-05-02 14:50:28', '2021-05-02 14:50:28'),
(2, 'User', 1, '2021-05-02 14:50:28', '2021-05-02 14:50:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_type` bigint(20) NOT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `id_num` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `id_type`, `role_id`, `id_num`, `email`, `password`, `created_at`, `updated_at`) VALUES
(23, 'Pedro', 'Elias', 1, 2, '5362469875', 'pedro@gmail.com', '$2a$08$ubj3R/3NbFtNcLvwrEX.E.XFS9C3RgsDatyjwOE18oK7JVZ1flDT.', '2021-10-12 17:08:34', '2021-10-15 15:50:00'),
(22, 'Jesus', 'Faria', 1, 1, '5896784569', 'deonatto@gmail.com', '$2a$08$S/Ysb5kgQVlaBvuABjfc.e2W4foRJQayIDUshdvl/Zq1jKOlSAFKS', '2021-10-12 16:58:09', '2021-10-12 16:58:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votes`
--

CREATE TABLE `votes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `poll_id` bigint(20) UNSIGNED DEFAULT NULL,
  `poll_option_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `vote_hash` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `votes`
--

INSERT INTO `votes` (`id`, `poll_id`, `poll_option_id`, `user_id`, `vote_hash`, `created_at`, `updated_at`) VALUES
(18, 14, 13, 7, 'B1WuWTh1PVZleBgn6g2h', '2021-05-03 20:13:39', '2021-05-03 20:13:39'),
(17, 1, 7, 7, '1WHk1oOw62enpGPVovzM', '2021-05-03 20:13:14', '2021-05-03 20:13:14'),
(20, 1, 7, 11, '26uhC3X2z6vaKT1Fk3ud', '2021-05-14 13:40:21', '2021-05-14 13:40:21'),
(21, 14, 11, 11, 'ce9urb6C7tSzyefq2xxN', '2021-05-28 00:47:44', '2021-05-28 00:47:44'),
(56, 1, 8, 23, 'mlbcw5romb9', '2021-10-15 15:51:09', '2021-10-15 15:51:09'),
(55, 25, 24, 23, 'y19ji6l0gk', '2021-10-15 15:16:08', '2021-10-15 15:16:08'),
(25, 1, 7, 16, 'eJDWPW23RFoQ5Qe9gjJI', '2021-06-06 23:27:14', '2021-06-06 23:27:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `id_types`
--
ALTER TABLE `id_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `poll_options`
--
ALTER TABLE `poll_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poll_options_poll_id_foreign` (`poll_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_id_type_foreign` (`id_type`) USING BTREE,
  ADD KEY `users_role_foreign` (`role_id`) USING BTREE;

--
-- Indices de la tabla `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votes_poll_id_foreign` (`poll_id`),
  ADD KEY `votes_poll_option_id_foreign` (`poll_option_id`),
  ADD KEY `votes_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `id_types`
--
ALTER TABLE `id_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `polls`
--
ALTER TABLE `polls`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `poll_options`
--
ALTER TABLE `poll_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `votes`
--
ALTER TABLE `votes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
