CREATE TABLE Account (
	id VARCHAR(64) PRIMARY KEY,
	email VARCHAR(256) UNIQUE,
	name NVARCHAR(64),
	passwd VARCHAR(256),
	type ENUM("default", "admin") DEFAULT "default",
	exp INT DEFAULT 0,
	lvl INT DEFAULT 1,
	create_date TIMESTAMP
);

CREATE TABLE TypeTest (
	id BINARY(16) PRIMARY KEY,
	user_id VARCHAR(64),
	wpm SMALLINT NOT NULL,
	test_start TIMESTAMP NOT NULL,
	test_end TIMESTAMP NOT NULL,
	type ENUM(
		"15s",
		"30s",
		"60s",
		"120s",
		"10w",
		"25w",
		"50w",
		"100w"
	) NOT NULL,
	accuracy DECIMAL(5, 2),
	validate BOOLEAN,
	KEY account_id_idx (user_id)
);

CREATE TABLE Duel (
	id BINARY(16) PRIMARY KEY,
	player1 VARCHAR(64) NOT NULL,
	player2 VARCHAR(64) DEFAULT NULL,
	p1_test BINARY(16) NOT NULL,
	p2_test BINARY(16) DEFAULT NULL,
	winner ENUM('player1', 'player2', 'tie'),
	duel_time TIMESTAMP NOT NULL,
	KEY player1_testid_index (p1_test),
	KEY player2_testid_index (p2_test)
);

CREATE TABLE AccountConfig (
	id VARCHAR(64),
	theme VARCHAR(32),
	test_set VARCHAR(32),
	test_type ENUM(
		"15s",
		"30s",
		"60s",
		"120s",
		"10w",
		"25w",
		"50w",
		"100w"
	) NOT NULL,
	KEY user_id_idx (id)
);