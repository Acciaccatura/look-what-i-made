CREATE TABLE Artist (
	id SERIAL NOT NULL,
	discord_user VARCHAR(32) NOT NULL,
	name VARCHAR(64),
	twitter_url VARCHAR(64),
	deviantart_url VARCHAR(64),
	instagram_url VARCHAR(64),
	pixiv_url VARCHAR(64),
	PRIMARY KEY (id)
);

CREATE TABLE Image (
	id SERIAL NOT NULL,
	artist INTEGER,
	url VARCHAR(256),
	width INTEGER,
	height INTEGER,
	PRIMARY KEY(id),
	FOREIGN KEY(artist) REFERENCES Artist(id)
);