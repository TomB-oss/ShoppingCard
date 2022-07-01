CREATE DATABASE IF NOT EXISTS `shoppingCard`;

USE `shoppingCard`;

CREATE TABLE `USERS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  PRIMARY KEY (`id`)
);
