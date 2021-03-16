CREATE DATABASE IF NOT EXISTS wowvendor;

use wowvendor;

CREATE TABLE IF NOT EXISTS `results` (
    `result_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `rock_position` INT UNSIGNED,   
    `rock_size` INT UNSIGNED,
    `jump_distance` INT UNSIGNED,
    `race_time` VARCHAR(10) NOT NULL,
    `race_result` VARCHAR(20) NOT NULL
);