const dotenv = require('dotenv');
const pg = require('pg');
dotenv.config();

var pgClientConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATA,
	port: 5432,
	host: process.env.DB_URL,
	ssl: true
};

module.exports = new pg.Client(pgClientConfig);