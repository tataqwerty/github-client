CREATE DATABASE IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS test.session(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`token` char(64) NOT NULL,	-- session id
	`user_id` int(11) NOT NULL,
	`last_activity` int(11) NOT NULL,
	UNIQUE KEY(`token`),
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS test.users(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`login` char(64) NOT NULL,
	`email` char(64) NOT NULL,
	`password` char(64) NOT NULL,
	PRIMARY KEY(`id`)
);

-- INSERT INTO `users` (`login`, `email`, `password`) VALUES('tralala', '123', 'asd');