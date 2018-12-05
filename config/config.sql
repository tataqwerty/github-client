CREATE DATABASE IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS test.session(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`token` char(64) NOT NULL,	-- session id
	`user_id` int(11) NOT NULL,
	`last_activity` int(11) NOT NULL,
	UNIQUE KEY(`token`),
	PRIMARY KEY(`id`)
);
