-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 16 2021 г., 08:49
-- Версия сервера: 8.0.19
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `wowvendor`
--

-- --------------------------------------------------------

--
-- Структура таблицы `results`
--

CREATE TABLE `results` (
  `result_id` int UNSIGNED NOT NULL,
  `rock_position` int UNSIGNED DEFAULT NULL,
  `rock_size` int UNSIGNED DEFAULT NULL,
  `jump_distance` int UNSIGNED DEFAULT NULL,
  `race_time` varchar(10) NOT NULL,
  `race_result` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `results`
--

INSERT INTO `results` (`result_id`, `rock_position`, `rock_size`, `jump_distance`, `race_time`, `race_result`) VALUES
(1, 464, 83, 346, '5:121', 'Success'),
(2, 572, 51, 454, '5:365', 'Success'),
(3, 435, 61, 316, '5:124', 'Success'),
(4, 292, 57, 0, '1:753', 'Fail'),
(8, 773, 54, 654, '5:112', 'Success'),
(9, 571, 40, 468, '7:451', 'Success'),
(10, 781, 41, 662, '5:757', 'Success');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`result_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `results`
--
ALTER TABLE `results`
  MODIFY `result_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
