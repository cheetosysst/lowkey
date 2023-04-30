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

INSERT
	Account (id, email, name, passwd, type, create_date)
VALUES
	(
		"bar",
		"bar@example.com",
		"abcde",
		"$2b$10$t7oxiwchWGHa/B9w0AzrYO2WH2rQbA86YSuQjSTmwIrpC/0ZXN7V2",
		"default",
		CURRENT_TIMESTAMP
	);

SELECT
	passwd
FROM
	Account
WHERE
	email = "das@example.com"
	OR id = 'das@example.com';

CREATE TABLE TypeTest (
	id BINARY(16) PRIMARY KEY,
	user_id VARCHAR(64),
	wpm SMALLINT NOT NULL,
	test_timestamp TIMESTAMP,
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
	KEY account_id_idx (user_id)
);

CREATE TABLE Duel (
	id BINARY(16) PRIMARY KEY,
	p1_test_id BINARY(16) NOT NULL,
	p2_test_id BINARY(16) NOT NULL,
	winner VARCHAR(64),
	duel_time TIMESTAMP,
	KEY player1_testid_index (p1_test_id),
	KEY player2_testid_index (p2_test_id)
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